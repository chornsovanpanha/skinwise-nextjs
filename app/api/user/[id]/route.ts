import { AppResponse } from "@/lib/axios/response";
import { deleteFile } from "@/lib/firebase/storage";
import prisma from "@/lib/prisma";
import { extractFilePathFromUrl } from "@/utils/helpers/Firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      Image: true,
    },
  });

  if (user) {
    return NextResponse.json(
      new AppResponse({
        data: user,
        status: 201,
      })
    );
  }
  return NextResponse.json(
    new AppResponse({
      data: [],
      status: 400,
    }),
    { status: 400 }
  );
}

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      Image: true,
    },
  });

  if (user) {
    const imageUrl = user.Image?.at(0)?.url;
    if (imageUrl) {
      const path = extractFilePathFromUrl(imageUrl);
      if (path) {
        await deleteFile(path);
      }

      console.log("File image has been deleted");
    }
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(
      new AppResponse({
        data: user,
        status: 201,
      })
    );
  }
  return NextResponse.json(
    new AppResponse({
      data: [],
      status: 400,
    }),
    { status: 400 }
  );
}
