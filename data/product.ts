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

export async function getProductDetail({ alias }: { alias: string }) {
  return prismaClient.product.findFirst({
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
}
