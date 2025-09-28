import { adminAuth } from "@/lib/firebase/admin";
import { validateUserPassword } from "@/lib/middleware/validate-password";
import { validateBody } from "@/lib/middleware/zod-validation";
import prismaClient from "@/lib/prisma";
import { LoginBy } from "@/types/prisma";
import { EXPIRED_AT, SESSION_NAME } from "@/utils/constant/cookie";
import { generateFallbackEmail } from "@/utils/generate/email-generate";
import { sendEmail } from "@/utils/node-mailer/send-email";
import { ApiLoginSchema, loginSchema } from "@/utils/schema";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApiLoginSchema;
    const data = await validateBody<ApiLoginSchema>(body, loginSchema);
    const { email: bodyEmail, idToken, loginBy, photoUrl } = body;

    let user;
    let imageQuery;

    const checkUserExist = await prismaClient.user.findUnique({
      where: { email: data?.email?.toLowerCase() },
    });
    if (!loginBy || loginBy == "email") {
      user = await prismaClient.user.findUnique({
        where: { email: bodyEmail?.toLowerCase() },
        select: {
          email: true,
          id: true,
          password: true,
          platform: true,
          loginBy: true,
          name: true,
          role: true,
          Image: {
            select: {
              url: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error("User with the email is not found.");
      }

      const isMatch = await validateUserPassword({
        hashedPassword: user.password!,
        password: data!.password!,
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
      const userEmail =
        bodyEmail ||
        decodedToken.email ||
        generateFallbackEmail(decodedToken.uid, loginBy ?? "email");
      const name = decodedToken.name || "";

      // Check if user exists, create if not update the information email and override the name

      user = await prismaClient.user.upsert({
        where: { email: userEmail },
        update: {
          name,
          platform: "web",
          password: loginBy,
          loginBy: loginBy as LoginBy,
        },
        create: {
          email: userEmail,
          name,
          platform: "web",
          loginBy: loginBy as LoginBy,
          password: loginBy ?? "social",
        },
        select: {
          email: true,
          id: true,
          platform: true,
          loginBy: true,
          name: true,
          role: true,
          Image: {
            select: {
              url: true,
            },
          },
        },
      });

      // Upsert image separately
      imageQuery = await prismaClient.image.upsert({
        where: {
          userId_url: {
            userId: user.id,
            url: photoUrl ?? "",
          },
        },
        update: {
          url: photoUrl ?? "",
        },
        create: {
          userId: user.id,
          url: photoUrl ?? "",
        },
        select: {
          url: true,
        },
      });
    }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + EXPIRED_AT * 1000);
    await prismaClient.session.create({
      data: { userId: user.id, token, expiresAt },
    });

    if (!checkUserExist?.email) {
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

        message: `<p>This is a welcoming message thanks you for trusting us.Enjoy ur member as skinwise.</p>`,
      });
    }

    const response = NextResponse.json({
      data: {
        id: user.id,
        platform: user.platform,
        loginBy: user.loginBy,
        name: user.name,
        role: user.role,
        email: user.email,
        photoUrl: imageQuery,
      },
    });

    response.cookies.set({
      name: SESSION_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
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
