import { PrismaClient, EffectType } from "@prisma/client";

const prisma = new PrismaClient();

async function productSeeds() {
  console.log("🚀 Starting product seed...");

  const products = [
    {
      name: "SKIN1004 Madagascar Centella Ampoule",
      alias: "skin1004-madagascar-centella-ampoule",
      code: "SK1004-AMP",
      brandName: "SKIN1004",
      country: "kr",
    },
    {
      name: "COSRX Advanced Snail 96 Mucin Power Essence",
      alias: "cosrx-advanced-snail-96-mucin-power-essence",
      code: "CRX-ESS96",
      brandName: "COSRX",
      country: "kr",
    },
    {
      name: "PURITO Oat-In Calming Gel Cream",
      alias: "purito-oat-in-calming-gel-cream",
      code: "PUR-OGC",
      brandName: "PURITO",
      country: "kr",
    },
    {
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      alias: "the-ordinary-niacinamide-10-zinc-1",
      code: "TO-NIA10Z1",
      brandName: "The Ordinary",
      country: "ca",
    },
    {
      name: "Anua Heartleaf 77% Soothing Toner",
      alias: "anua-heartleaf-77-soothing-toner",
      code: "AN-HT77",
      brandName: "Anua",
      country: "kr",
    },
    {
      name: "CeraVe Foaming Facial Cleanser",
      alias: "cerave-foaming-facial-cleanser",
      code: "CV-FOAM",
      brandName: "CeraVe",
      country: "us",
    },
    {
      name: "Neutrogena Hydro Boost Gel Cream",
      alias: "neutrogena-hydro-boost-gel-cream",
      code: "NT-HBG",
      brandName: "Neutrogena",
      country: "us",
    },
    {
      name: "La Roche-Posay Pure Vitamin C10 Serum",
      alias: "la-roche-posay-pure-vitamin-c10-serum",
      code: "LRP-C10",
      brandName: "La Roche-Posay",
      country: "fr",
    },
    {
      name: "Bioderma Sensibio H2O Micellar Water",
      alias: "bioderma-sensibio-h2o-micellar-water",
      code: "BD-SENS-H2O",
      brandName: "Bioderma",
      country: "fr",
    },
    {
      name: "Paula’s Choice 2% BHA Liquid Exfoliant",
      alias: "paulas-choice-2-bha-liquid-exfoliant",
      code: "PC-BHA2L",
      brandName: "Paula’s Choice",
      country: "us",
    },
  ];

  // Get all ingredients for random assignment
  const allIngredients = await prisma.ingredient.findMany({
    select: { id: true },
  });

  for (const p of products) {
    // Find existing brand or create a new one
    let brand = await prisma.brand.findFirst({ where: { title: p.brandName } });
    if (!brand) {
      brand = await prisma.brand.create({
        data: {
          title: p.brandName,
          alias: p.brandName.toLowerCase().replace(/\s+/g, "-"),
          country: p.country,
        },
      });
    }

    // Randomly pick 2-4 ingredients for this product
    const randomIngredients = allIngredients
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 2);

    // Create product with effects, ingredients, and insideGroups
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

    console.log(
      `✅ Created product: ${product.name} [${brand.title} - ${brand.country}]`
    );
  }

  console.log("🎉 Product seed completed.");
}

export { productSeeds };
