import prismaClientTools from "@/lib/prisma";
import { sendEmail } from "@/utils/node-mailer/send-email";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prismaClientTools.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: "Email sent" });
  //This will generate token reset password only
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prismaClientTools.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt },
  });

  // Send to email to user
  await sendEmail({
    sender: {
      address: "Nightpp19@gmail.com",
      name: "Skin Wise Development",
    },

    subject: "Reset Your Password",
    receipients: [
      {
        address: user?.email,
        name: user?.name ?? "N/A",
      },
    ],

    message: `<p>Click <a href="https://localhost:3000/auth/reset-password?token=${token}">here</a> to reset your password.</p>`,
  });
  return NextResponse.json({ message: "Email sent" });
}
