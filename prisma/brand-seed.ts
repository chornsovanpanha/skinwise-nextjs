import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedBrands() {
  const brands = [
    { name: "The Ordinary", country: "ca" },
    { name: "COSRX", country: "kr" },
    { name: "La Roche-Posay", country: "fr" },
    { name: "Neutrogena", country: "us" },
    { name: "e.l.f. Cosmetics", country: "us" },
    { name: "NYX Cosmetics", country: "us" },
    { name: "Fenty Beauty", country: "us" },
    { name: "L’Oréal", country: "fr" },
    { name: "Sephora Collection", country: "fr" },
    { name: "Bioderma", country: "fr" },
  ];

  for (const brand of brands) {
    await prisma.brand.create({
      data: {
        title: brand.name,
        alias: brand.name.toLowerCase().replace(/\s+/g, "-"),
        country: brand.country,
      },
    });
    console.log(`Brand ${brand.name} seeded successfully.`);
  }
}
