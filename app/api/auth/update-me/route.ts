import prismaClientTools from "@/lib/prisma";
import { EXPIRED_AT, SESSION_NAME } from "@/utils/constant/cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Get the session token from cookies
    const token = req.cookies.get(SESSION_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No session token found" },
        { status: 401 }
      );
    }

    // Find session in DB
    const session = await prismaClientTools.session.findUnique({
      where: { token: token },
    });

    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Update session expiration
    const newExpiresAt = new Date(Date.now() + EXPIRED_AT * 1000);
    await prismaClientTools.session.update({
      where: { token },
      data: { expiresAt: newExpiresAt },
    });

    // Update cookie with new expiration
    const response = NextResponse.json({ message: "Session refreshed" });
    response.cookies.set({
      name: SESSION_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: EXPIRED_AT,
      expires: newExpiresAt,
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

// export const POST = withAuth(handler);
