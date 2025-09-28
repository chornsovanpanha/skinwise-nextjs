import prismaClient from "@/lib/prisma";
import { sendEmail } from "@/utils/node-mailer/send-email";
import { ApiLoginSchema } from "@/utils/schema";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = (await req.json()) as ApiLoginSchema;
  const user = await prismaClient.user.findUnique({
    where: { email: email?.toLowerCase() },
  });
  if (!user) return NextResponse.json({ data: "Email has been sent!" });

  //This will generate token reset password only
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prismaClient.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt },
  });

  // Send to email to user
  await sendEmail({
    sender: {
      address: "amyjohn922@gmail.com",
      name: "Skin Wise Development",
    },

    subject: "Reset Your Password",
    receipients: [
      {
        address: user?.email,
        name: user?.name ?? "N/A",
      },
    ],

    message: `<p>Click <a href="http://localhost:3000/reset-password?token=${token}">here</a> to reset your password.</p>`,
  });
  return NextResponse.json({ data: "Email has been sent!" });
}
