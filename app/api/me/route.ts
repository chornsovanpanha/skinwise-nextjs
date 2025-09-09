import { withAuth } from "@/lib/middleware/with-auth";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const handler = async (
  req: NextRequest & { user: User }
): Promise<NextResponse> => {
  console.log(req.user);
  return NextResponse.json({ data: "Success" });
};

export const GET = withAuth(handler);
