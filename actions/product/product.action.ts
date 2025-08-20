import prismaClientTools from "@/lib/prisma";

export async function getProductActions() {
  return prismaClientTools.product.findMany({});
}
