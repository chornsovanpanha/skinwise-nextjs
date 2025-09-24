import { PrismaClient, SkinType, EffectType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ----- Brands -----
  const brand1 = await prisma.brand.create({
    data: { alias: "skin1004", title: "SKIN1004" },
  });
  const brand2 = await prisma.brand.create({
    data: { alias: "theordinary", title: "The Ordinary" },
  });

  // ----- Categories -----
  const cat1 = await prisma.category.create({
    data: { alias: "ampoule", title: "Ampoule" },
  });
  const cat2 = await prisma.category.create({
    data: { alias: "serum", title: "Serum" },
  });

  // ----- Ingredients -----
  const ingredient1 = await prisma.ingredient.create({
    data: {
      alias: "niacinamide",
      name: "Niacinamide",
      desc: "Vitamin B3, improves skin tone.",
      about: "Helps with acne, brightening, and pore control.",
    },
  });
  const ingredient2 = await prisma.ingredient.create({
    data: {
      alias: "hyaluronic_acid",
      name: "Hyaluronic Acid",
      desc: "Hydrating molecule.",
      about: "Helps skin retain moisture and plumpness.",
    },
  });
  const ingredient3 = await prisma.ingredient.create({
    data: {
      alias: "centella_asiatica",
      name: "Centella Asiatica",
      desc: "Soothing plant extract.",
      about: "Calms irritation and redness.",
    },
  });
  const ingredient4 = await prisma.ingredient.create({
    data: {
      alias: "vitamin_c",
      name: "Vitamin C",
      desc: "Brightening antioxidant.",
      about: "Reduces dark spots and pigmentation.",
    },
  });
  const ingredient5 = await prisma.ingredient.create({
    data: {
      alias: "peptides",
      name: "Peptides",
      desc: "Supports skin elasticity.",
      about: "Helps with anti-aging and firmness.",
    },
  });

  // ----- Products -----
  const product1 = await prisma.product.create({
    data: {
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      code: "TO-Niacinamide-10-Zinc-1",
      alias: "niacinamide-serum",
      desc: "Serum with 10% niacinamide + zinc to reduce blemishes.",
      rating: 0,
      brand: { connect: { id: brand2.id } },
      category: { connect: { id: cat2.id } },
      Image: {
        create: [
          {
            url: "https://storage.skinsort.com/9bnod571gpx24zzz8mk945v8f39c1",
            altText: "The Ordinary Niacinamide Front",
            width: 600,
            height: 800,
          },
          {
            url: "https://storage.skinsort.com/9bnod571gpx24zzz8mk945v8f39c2",
            altText: "The Ordinary Niacinamide Back",
            width: 600,
            height: 800,
          },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "SKIN1004 Madagascar Centella Ampoule",
      code: "SK1004_Centella_Ampoule",
      alias: "madagascar-centella-ampoule",
      desc: "Light ampoule rich in centella asiatica extract for calming skin.",
      rating: 0,
      brand: { connect: { id: brand1.id } },
      category: { connect: { id: cat1.id } },
      Image: {
        create: [
          {
            url: "https://storage.skinsort.com/9bnod571gpx24zzz8mk945v8f39c3",
            altText: "Madagascar Centella Ampoule Front",
            width: 600,
            height: 800,
          },
          {
            url: "https://storage.skinsort.com/9bnod571gpx24zzz8mk945v8f39c4",
            altText: "Madagascar Centella Ampoule Back",
            width: 600,
            height: 800,
          },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Vitamin C Brightening Serum",
      code: "VC-Bright-Serum",
      alias: "vitamin-c-serum",
      desc: "Antioxidant serum to brighten and even skin tone.",
      rating: 0,
      brand: { connect: { id: brand2.id } },
      category: { connect: { id: cat2.id } },
      Image: {
        create: [
          {
            url: "https://storage.skinsort.com/z8eu0hfnxga3k2vcp1ar5vt7onac",
            altText: "Vitamin C Serum Front",
            width: 600,
            height: 800,
          },
        ],
      },
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Peptide Anti-Aging Serum",
      code: "PA-Serum",
      alias: "peptide-serum",
      desc: "Serum with peptides to improve elasticity and reduce wrinkles.",
      rating: 0,
      brand: { connect: { id: brand1.id } },
      category: { connect: { id: cat2.id } },
      Image: {
        create: [
          {
            url: "https://storage.skinsort.com/ca5bcw6gnh5x7j585edcy5zx755b",
            altText: "Peptide Serum Front",
            width: 600,
            height: 800,
          },
        ],
      },
    },
  });

  // ----- ProductIngredients -----
  await prisma.productIngredient.createMany({
    data: [
      {
        productId: product1.id,
        ingredientId: ingredient1.id,
        concentration: "10%",
        notes: "High strength for blemishes",
      },
      {
        productId: product2.id,
        ingredientId: ingredient3.id,
        concentration: "5%",
        notes: "Calming effect",
      },
      {
        productId: product3.id,
        ingredientId: ingredient4.id,
        concentration: "15%",
        notes: "Brightening",
      },
      {
        productId: product4.id,
        ingredientId: ingredient5.id,
        concentration: "8%",
        notes: "Supports elasticity",
      },
      {
        productId: product3.id,
        ingredientId: ingredient1.id,
        concentration: "2%",
        notes: "Additional acne support",
      },
    ],
  });

  // ----- Product Effects -----
  await prisma.productEffect.createMany({
    data: [
      {
        productId: product1.id,
        type: EffectType.POSITIVE,
        title: "Reduces Blemishes",
        shortDesc: "Helps clear acne",
        desc: "Niacinamide helps regulate sebum production",
      },
      {
        productId: product2.id,
        type: EffectType.POSITIVE,
        title: "Soothes Skin",
        shortDesc: "Reduces irritation",
        desc: "Centella extract calms redness",
      },
      {
        productId: product3.id,
        type: EffectType.POSITIVE,
        title: "Brightens Skin",
        shortDesc: "Reduces dark spots",
        desc: "Vitamin C protects and brightens skin",
      },
      {
        productId: product4.id,
        type: EffectType.POSITIVE,
        title: "Improves Elasticity",
        shortDesc: "Anti-aging",
        desc: "Peptides help firm skin",
      },
    ],
  });

  // ----- Ingredient Effects -----
  await prisma.ingredientEffect.createMany({
    data: [
      {
        ingredientId: ingredient1.id,
        type: EffectType.POSITIVE,
        title: "Acne Support",
        shortDesc: "Reduces blemishes",
        desc: "Regulates sebum production",
      },
      {
        ingredientId: ingredient2.id,
        type: EffectType.POSITIVE,
        title: "Hydration",
        shortDesc: "Keeps skin plump",
        desc: "Attracts water to skin layers",
      },
      {
        ingredientId: ingredient3.id,
        type: EffectType.POSITIVE,
        title: "Soothing",
        shortDesc: "Calms irritation",
        desc: "Reduces redness and inflammation",
      },
      {
        ingredientId: ingredient4.id,
        type: EffectType.POSITIVE,
        title: "Brightening",
        shortDesc: "Reduces dark spots",
        desc: "Antioxidant activity",
      },
      {
        ingredientId: ingredient5.id,
        type: EffectType.POSITIVE,
        title: "Firmness",
        shortDesc: "Supports elasticity",
        desc: "Stimulates collagen production",
      },
    ],
  });

  // ----- Similar Ingredients -----
  await prisma.similarIngredient.createMany({
    data: [
      { fromId: ingredient1.id, toId: ingredient4.id }, // Niacinamide ↔ Vitamin C
      { fromId: ingredient4.id, toId: ingredient1.id },
      { fromId: ingredient3.id, toId: ingredient5.id }, // Centella ↔ Peptides
      { fromId: ingredient5.id, toId: ingredient3.id },
    ],
  });

  // ----- Product Skin Matches -----
  await prisma.productSkinMatch.createMany({
    data: [
      { productId: product1.id, skinType: SkinType.OILY, score: 90.0 },
      { productId: product1.id, skinType: SkinType.SENSITIVE, score: 50.0 },
      { productId: product2.id, skinType: SkinType.DRY, score: 95.0 },
      { productId: product2.id, skinType: SkinType.NORMAL, score: 85.0 },
      { productId: product3.id, skinType: SkinType.DRY, score: 90.0 },
      { productId: product4.id, skinType: SkinType.NORMAL, score: 88.0 },
    ],
  });

  // ----- Ingredient Skin Matches -----
  await prisma.ingredientSkinMatch.createMany({
    data: [
      { ingredientId: ingredient1.id, skinType: SkinType.OILY, score: 80.0 },
      {
        ingredientId: ingredient1.id,
        skinType: SkinType.SENSITIVE,
        score: 40.0,
      },
      { ingredientId: ingredient2.id, skinType: SkinType.DRY, score: 95.0 },
      { ingredientId: ingredient2.id, skinType: SkinType.NORMAL, score: 90.0 },
      {
        ingredientId: ingredient3.id,
        skinType: SkinType.SENSITIVE,
        score: 85.0,
      },
      { ingredientId: ingredient4.id, skinType: SkinType.DRY, score: 90.0 },
      { ingredientId: ingredient5.id, skinType: SkinType.NORMAL, score: 88.0 },
    ],
  });

  console.log(
    "Seed data with products, ingredients, effects, and similar ingredients created"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
