import prismaClient from "@/lib/prisma";

export async function getPartialIngredients() {
  return prismaClient.ingredient.findMany({
    take: 4,
    orderBy: {
      searchCount: "desc",
    },
  });
}

export async function getIngredientDetail({
  alias,
  updateCount = true,
}: {
  alias: string;
  updateCount?: boolean;
}) {
  const ingredient = await prismaClient.ingredient.findFirst({
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

  if (!ingredient) return null;
  // Increment search count atomically
  if (updateCount) {
    await prismaClient.ingredient.update({
      where: { id: ingredient.id },
      data: {
        searchCount: { increment: 1 },
      },
    });
  }

  return ingredient;
}
