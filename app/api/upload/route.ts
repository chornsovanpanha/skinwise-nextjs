import { deleteFile, uploadFileStream } from "@/lib/firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uploadUrl = await uploadFileStream(file, "images", file.name);
    return NextResponse.json({
      url: uploadUrl,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 422 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const request = req.nextUrl.searchParams;
    const pathName = request.get("path") ?? "";
    const uploadUrl = await deleteFile(pathName);
    if (uploadUrl)
      return NextResponse.json({
        message: pathName + " has been deleted",
      });
  } catch (error) {
    return NextResponse.json(error, { status: 422 });
  }
}
