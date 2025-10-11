import prismaClient from "@/lib/prisma";

type ProductComparisonType = {
  primaryAlias?: string;
  secondaryAlias?: string;
};
export async function getProductComparison({
  primaryAlias,
  secondaryAlias,
}: ProductComparisonType) {
  const products = await prismaClient.product.findMany({
    where: {
      OR: [
        {
          alias: {
            contains: primaryAlias,
            mode: "insensitive",
          },
        },
        {
          alias: {
            contains: secondaryAlias,
            mode: "insensitive",
          },
        },
      ],
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

  return products;
}
