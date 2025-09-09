import { PrismaClient } from "@prisma/client";
const prismaclient = new PrismaClient();
// async function seedUsers() {
//   await prismaclient.user.createMany({
//     data: [
//       {
//         name: "vorn",
//         email: "dararith@gmail.com",
//       },
//       {
//         name: "hour",
//         email: "hour@gmail.com",
//       },
//     ],
//   });
// }

async function seedProducts() {
  await prismaclient.product.createMany({
    data: [
      {
        name: "Madagascar Centella Ampoule Foam",
        code: "MCF001",
        desc: "Gentle foaming cleanser enriched with centella asiatica extract.",
        rating: 5,
      },
      {
        name: "Aloe Vera Soothing Gel",
        code: "AVSG002",
        desc: "Hydrating gel for sensitive and irritated skin.",
        rating: 4,
      },
      {
        name: "Vitamin C Brightening Serum",
        code: "VCBS003",
        desc: "Serum to brighten and even out skin tone.",
        rating: 4.5,
      },
      {
        name: "Hyaluronic Acid Moisturizer",
        code: "HAM004",
        desc: "Deeply hydrating cream for all skin types.",
        rating: 5,
      },
      {
        name: "Green Tea Balancing Toner",
        code: "GTBT005",
        desc: "Toner that helps control oil and refresh the skin.",
        rating: 4,
      },
    ],
  });
}
seedProducts().then(() => prismaclient.$disconnect());
