import { SESSION_NAME } from "@/utils/constant/cookie";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prismaClientTools from "../prisma";

export type AppRouteHandler = (
  req: NextRequest & { user: User }
) => Promise<NextResponse>;

export function withAuth(handler: AppRouteHandler) {
  return async function (req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get(SESSION_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await prismaClientTools.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await prismaClientTools.session.delete({ where: { token } });
      }
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const reqWithUser = Object.assign(req, { user: session.user });
    return handler(reqWithUser);
  };
}
