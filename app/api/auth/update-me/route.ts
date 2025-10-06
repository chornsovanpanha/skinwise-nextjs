import prismaClient from "@/lib/prisma";
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

    // Find session in DB and include user
    const session = await prismaClient.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            subscription: true,
            Image: true,
            profile: true,
          },
          omit: {
            password: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Update session expiration
    const newExpiresAt = new Date(Date.now() + EXPIRED_AT * 1000);
    await prismaClient.session.update({
      where: { token },
      data: { expiresAt: newExpiresAt },
    });

    // Return updated user info
    const response = NextResponse.json({
      data: {
        id: session.user.id,
        platform: session.user.platform,
        loginBy: session.user.loginBy,
        name: session.user.name,
        role: session.user.role,
        email: session.user.email,
        photoUrl: session.user.Image,
      },
    });

    // Update cookie expiration
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
