import prismaClientTools from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  //Validate if the token that user click and server are the same
  const resetToken = await prismaClientTools.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prismaClientTools.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  // Delete token after use
  await prismaClientTools.passwordResetToken.delete({ where: { token } });

  //  invalidate all sessions
  await prismaClientTools.session.deleteMany({
    where: { userId: resetToken.userId },
  });

  return NextResponse.json({ data: "Password reset successfully" });
}
