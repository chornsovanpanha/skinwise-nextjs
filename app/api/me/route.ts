import { withAuth } from "@/lib/middleware/with-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  return NextResponse.json({ data: "Success" });
};

export const GET = withAuth(handler);
