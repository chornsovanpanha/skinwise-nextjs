import prismaClient from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function getPopularProducts() {
  const result: Prisma.ProductGetPayload<{
    include: { Image: true; brand: true };
  }>[] = await prismaClient.product.findMany({
    take: 3,
    include: { Image: true, brand: true },
    orderBy: { searchCount: "desc" },
  });

  return result;
}

export async function getProductDetail({
  alias,
  updateCount = true,
}: {
  alias: string;
  updateCount?: boolean;
}) {
  // console.time("getProductDetail");

  const product = await prismaClient.product.findFirst({
    where: {
      alias: alias,
    },
    include: {
      effects: true,
      insideGroups: true,
      brand: true,
      Image: {
        select: {
          url: true,
          altText: true,
        },
      },
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  if (!product) return null;
  // Increment search count atomically
  if (updateCount) {
    await prismaClient.product.update({
      where: { id: product.id },
      data: {
        searchCount: { increment: 1 },
      },
    });
  }

  return product;
}
