import { validateBody } from "@/lib/middleware/zod-validation";
import prismaClient from "@/lib/prisma";
import { EXPIRED_AT, SESSION_NAME } from "@/utils/constant/cookie";
import { sendEmail } from "@/utils/node-mailer/send-email";
import { extendedRegisterSchema, RegisterSchemaType } from "@/utils/schema";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterSchemaType;
    const data = await validateBody<RegisterSchemaType>(
      body,
      extendedRegisterSchema
    );
    const { email, password, firstName, lastName } = body;

    const existingUser = await prismaClient.user.findUnique({
      where: { email: email?.toLowerCase() },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        email: data.email?.toLowerCase(),
        password: hashedPassword,
        name: firstName + " " + lastName,
        platform: request.headers.get("user-agent")?.toString(),
        loginBy: "email",
      },
    });

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + EXPIRED_AT * 1000);

    await prismaClient.session.create({
      data: { userId: user.id, token, expiresAt },
    });

    const response = NextResponse.json({
      data: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set({
      name: SESSION_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: EXPIRED_AT,
      expires: expiresAt,
    });
    await sendEmail({
      sender: {
        address: "amyjohn922@gmail.com",
        name: "Skin Wise",
      },

      subject: "Welcome to skinwise",
      receipients: [
        {
          address: user?.email,
          name: user?.name ?? "N/A",
        },
      ],

      message: `<p>This is a welcoming message thanks you for trusting us. Enjoy ur member as skinwise.</p>`,
    });

    return response;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err?.flatten().fieldErrors },
        { status: 400 }
      );
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err?.message }, { status: 400 });
    }
  }
}
