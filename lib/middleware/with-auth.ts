import { SESSION_NAME } from "@/utils/constant/cookie";
import { NextRequest, NextResponse } from "next/server";
import prismaClientTools from "../prisma";

type AppRouteHandler = (req: NextRequest, user: any) => Promise<NextResponse>;

export function withAuth(handler: AppRouteHandler): AppRouteHandler {
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

    return handler(req, session.user);
  };
}
