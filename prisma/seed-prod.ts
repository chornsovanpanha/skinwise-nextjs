import { PrismaClient, EffectType } from "@prisma/client";

const prisma = new PrismaClient();

async function productionSeeds() {
  console.log("🧪 Production DEV mock seed...");

  // --- Brands ---
  const brands = [
    { name: "GlowLab", country: "us" },
    { name: "DermaCo", country: "kr" },
    { name: "SkinScience", country: "fr" },
    { name: "AquaPure", country: "us" },
    { name: "Botanika", country: "kr" },
  ];

  const createdBrands: { [key: string]: any } = {};
  for (const b of brands) {
    const brand = await prisma.brand.create({
      data: {
        title: b.name,
        alias: b.name.toLowerCase().replace(/\s+/g, "-"),
        country: b.country,
      },
    });
    createdBrands[b.name] = brand;
    console.log(`Brand ${b.name} seeded.`);
  }

  // --- Ingredients ---
  const ingredients = [
    { name: "Aloe Vera", alias: "aloe-vera" },
    { name: "Chamomile Extract", alias: "chamomile-extract" },
    { name: "Green Tea", alias: "green-tea" },
    { name: "Panthenol", alias: "panthenol" },
    { name: "Centella Asiatica", alias: "centella-asiatica" },
    { name: "Shea Butter", alias: "shea-butter" },
    { name: "Niacinamide", alias: "niacinamide" },
  ];

  const createdIngredients: { id: number }[] = [];
  for (const ing of ingredients) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: ing.name,
        alias: ing.alias,
        desc: "",
        about: "",
        effects: {
          create: [
            { type: EffectType.POSITIVE, title: "", shortDesc: "", desc: "" },
            { type: EffectType.NEGATIVE, title: "", shortDesc: "", desc: "" },
          ],
        },
      },
    });
    createdIngredients.push({ id: ingredient.id });
    console.log(`Ingredient ${ing.name} created.`);
  }

  // --- Products ---
  const products = [
    {
      name: "GlowLab Soothing Face Gel",
      alias: "glowlab-soothing-face-gel",
      code: "GL-FG01",
      brandName: "GlowLab",
    },
    {
      name: "DermaCo Calming Serum",
      alias: "dermaco-calming-serum",
      code: "DC-CS02",
      brandName: "DermaCo",
    },
    {
      name: "SkinScience Hydrating Cream",
      alias: "skinscience-hydrating-cream",
      code: "SS-HC03",
      brandName: "SkinScience",
    },
    {
      name: "AquaPure Daily Moisturizer",
      alias: "aquapure-daily-moisturizer",
      code: "AP-DM04",
      brandName: "AquaPure",
    },
    {
      name: "Botanika Gentle Cleanser",
      alias: "botanika-gentle-cleanser",
      code: "BT-GC05",
      brandName: "Botanika",
    },
  ];

  for (const p of products) {
    const brand = createdBrands[p.brandName];

    // Randomly pick 2-4 ingredients
    const randomIngredients = createdIngredients
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 2);

    const product = await prisma.product.create({
      data: {
        name: p.name,
        alias: p.alias,
        code: p.code,
        desc: "",
        rating: Math.floor(Math.random() * 5),
        brandId: brand.id,
        searchCount: 0,
        effects: {
          create: [
            { type: EffectType.POSITIVE, title: "", shortDesc: "", desc: "" },
            { type: EffectType.NEGATIVE, title: "", shortDesc: "", desc: "" },
          ],
        },
        ingredients: {
          create: randomIngredients.map((ing) => ({
            ingredient: { connect: { id: ing.id } },
          })),
        },
        insideGroups: {
          create: [{ title: "Example inside group" }],
        },
      },
    });

    console.log(`✅ Created product: ${product.name} [${brand.title}]`);
  }

  console.log("🎉 Production mock seed completed!");
}

export { productionSeeds };
