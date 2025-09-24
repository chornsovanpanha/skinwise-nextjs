import { PlanType } from "@prisma/client";

export const skinWisePlans = [
  {
    name: "Free",
    price: 0.0,
    billingCycle: "per month",
    isCurrentPlan: true,
    type: PlanType.FREE,
    features: [
      "4 ingredient searches / day",
      "3 product comparisons / day",
      "Build up to 4 routines",
      "Basic quiz results (skin type + concerns)",
      "Basic product info",
    ],
  },
  {
    name: "Premiere",
    price: 9.99,
    type: PlanType.PRO,
    billingCycle: "per month",
    isCurrentPlan: false,
    features: [
      "Unlimited ingredient searches",
      "Save up to 10+ routines",
      "Personalized Recommendations (with quiz)",
      "Full product details & analysis",
      "Ad-free + priority updates",
    ],
  },
];
