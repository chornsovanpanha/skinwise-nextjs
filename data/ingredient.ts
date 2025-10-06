import prismaClient from "@/lib/prisma";

export async function getPartialIngredients() {
  return prismaClient.ingredient.findMany({
    take: 4,
  });
}

export async function getIngredientDetail({ alias }: { alias: string }) {
  return prismaClient.ingredient.findFirst({
    where: {
      alias: alias,
    },
    include: {
      effects: true,
      IngredientSkinMatch: true,
      insideGroups: true,
      products: {
        include: {
          product: {
            include: {
              Image: true,
              brand: true,
            },
          },
        },
      },

      similarTo: {
        include: {
          from: true,
        },
      },
    },
  });
}
