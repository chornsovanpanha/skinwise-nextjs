import prismaClient from "@/lib/prisma";

export async function getPartialIngredients() {
  return prismaClient.ingredient.findMany({
    take: 4,
  });
}
