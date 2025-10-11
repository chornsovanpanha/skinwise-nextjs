import { deleteFile, uploadFileStream } from "@/lib/firebase/storage";
import prisma from "@/lib/prisma"; // your Prisma client
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const productId = formData.get("productId")?.toString();
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // Find existing product and its image
    const existing = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { Image: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete old images from Firebase
    if (existing.Image?.length) {
      for (const img of existing.Image) {
        if (img.url) await deleteFile(img.url); // your function to delete from Firebase
      }
    }

    // Upload new image
    const url = await uploadFileStream(file, "products", file.name);
    const imageData = [{ url, altText: file.name }];

    // Update product images
    const updated = await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        Image: {
          deleteMany: {}, // remove old images
          create: imageData, // add new image
        },
      },
      include: { Image: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update product image" },
      { status: 500 }
    );
  }
}
