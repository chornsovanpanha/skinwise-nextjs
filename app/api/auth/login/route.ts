import { adminAuth } from "@/lib/firebase/admin";
import { validateUserPassword } from "@/lib/middleware/validate-password";
import { validateBody } from "@/lib/middleware/zod-validation";
import prismaClientTools from "@/lib/prisma";
import { EXPIRED_AT, SESSION_NAME } from "@/utils/constant/cookie";
import { generateFallbackEmail } from "@/utils/generate/email-generate";
import { extendedLoginSchema, LoginSchemaType } from "@/utils/schema";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginSchemaType;
    const data = await validateBody<LoginSchemaType>(body, extendedLoginSchema);
    const { email: bodyEmail, idToken, loginBy } = body;

    let user;

    if (!loginBy || loginBy == "email") {
      user = await prismaClientTools.user.findUnique({
        where: { email: bodyEmail },
        select: {
          email: true,
          id: true,
          password: true,
          platform: true,
          loginBy: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        throw new Error("User with the email is not found.");
      }

      const isMatch = await validateUserPassword({
        hashedPassword: user.password!,
        password: data?.password!,
      });

      if (!isMatch) {
        throw new Error("Please check your email or password again.");
      }
    } else {
      // Social login via Firebase facebook / Gmail or apple
      if (!idToken) {
        return NextResponse.json(
          { error: "idToken is required for social login" },
          { status: 400 }
        );
      }

      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const email =
        decodedToken.email ||
        generateFallbackEmail(decodedToken.uid, loginBy ?? "email");
      const name = decodedToken.name || "";
      // Check if user exists, create if not update the information email and override the name
      user = await prismaClientTools.user.upsert({
        where: { email },
        update: { name, platform: loginBy, password: loginBy },
        create: {
          email,
          name,
          platform: loginBy,
          password: loginBy ?? "social",
        },
        select: {
          email: true,
          id: true,
          platform: true,
          loginBy: true,
          name: true,
          role: true,
        },
      });
    }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + EXPIRED_AT * 1000);
    await prismaClientTools.session.create({
      data: { userId: user.id, token, expiresAt },
    });

    const response = NextResponse.json({
      data: {
        id: user.id,
        platform: user.platform,
        loginBy: user.loginBy,
        name: user.name,
        role: user.role,
      },
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
        { error: err.flatten().fieldErrors },
        { status: 400 }
      );
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
  }
}
