import { validateBody } from "@/lib/middleware/zod-validation";
import prismaClientTools from "@/lib/prisma";
import { EXPIRED_AT, SESSION_NAME } from "@/utils/constant/cookie";
import { registerSchema, RegisterSchemaType } from "@/utils/schema";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterSchemaType;
    await validateBody<RegisterSchemaType>(body, registerSchema);
    const { email, password, firstName, lastName } = body;

    const existingUser = await prismaClientTools.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClientTools.user.create({
      data: {
        email,
        password: hashedPassword,
        name: firstName + " " + lastName,
        platform: request.headers.get("user-agent")?.toString(),
        loginBy: "email",
      },
    });

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + EXPIRED_AT * 1000);

    await prismaClientTools.session.create({
      data: { userId: user.id, token, expiresAt },
    });

    const response = NextResponse.json({
      data: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set({
      name: SESSION_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: EXPIRED_AT,
      expires: expiresAt,
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
