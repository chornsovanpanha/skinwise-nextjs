import prismaClient from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export type ProductWithBrandAndImages = Prisma.ProductGetPayload<{
  include: {
    Image: Prisma.Product$ImageArgs;
    brand: { select: { name: true } };
  };
}>;

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
