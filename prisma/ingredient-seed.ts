import { EffectType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function ingredientSeeds() {
  console.log("Starting ingredient seed...");

  const ingredients = [
    { name: "Retinol", alias: "retinol" },
    { name: "Vitamin C", alias: "vitamin-c" },
    { name: "Niacinamide", alias: "niacinamide" },
    { name: "Hyaluronic Acid", alias: "hyaluronic-acid" },
    { name: "Salicylic Acid", alias: "salicylic-acid" },
    { name: "Glycolic Acid", alias: "glycolic-acid" },
    { name: "Lactic Acid", alias: "lactic-acid" },
    { name: "Peptides", alias: "peptides" },
    { name: "Ceramides", alias: "ceramides" },
    { name: "Zinc Oxide", alias: "zinc-oxide" },
  ];

  for (const ing of ingredients) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: ing.name,
        alias: ing.alias,
        desc: "",
        about: "",
        effects: {
          create: [
            {
              type: EffectType.POSITIVE,
              title: "",
              shortDesc: "",
              desc: "",
            },
            {
              type: EffectType.NEGATIVE,
              title: "",
              shortDesc: "",
              desc: "",
            },
          ],
        },
      },
    });

    console.log(`Created ingredient: ${ingredient.name}`);
  }

  console.log("Ingredient seed completed.");
}
