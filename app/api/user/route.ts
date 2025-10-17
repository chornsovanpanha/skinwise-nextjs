import { AppResponse } from "@/lib/axios/response";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await prisma.user.findMany({
    include: {
      Image: true,
    },
    omit: {
      password: true,
      searchCount: true,
    },
  });

  return NextResponse.json(
    new AppResponse({
      data: user,
      status: 200,
    }),
    { status: 200 }
  );
}
