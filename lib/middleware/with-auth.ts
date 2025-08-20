// lib/withAuth.ts
import { NextRequest, NextResponse } from "next/server";

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // optionally verify token here
    // const user = await verifyToken(token);

    // Attach user to request if needed
    // req.user = user;

    return handler(req);
  };
}
