import prismaClient from "@/lib/prisma";
import { SESSION_NAME } from "@/utils/constant/cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_NAME)?.value;

  if (sessionToken) {
    await prismaClient.session.deleteMany({
      where: { token: sessionToken },
    });
  }

  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set({
    name: SESSION_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
