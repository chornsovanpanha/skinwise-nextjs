import { PlanType } from "@prisma/client";

export const skinWisePlans = [
  {
    name: "Free",
    price: 0.0,
    billingCycle: "per month",
    isCurrentPlan: true,
    type: PlanType.FREE,
    features: [
      "Up to 5 actions daily per 24h ",
      "Feature ( Product Overview, Ingredient, and Comparisons ).",
      "Product and ingredient basic skin care information ",
      "Build up to 3 skin care products per routine",
      "Basic quiz results (skin type + concerns)",
    ],
  },
  {
    name: "Premium",
    price: 5.99,
    type: PlanType.PRO,
    billingCycle: "per month",
    isCurrentPlan: false,
    features: [
      "Unlimited ingredient and product searches",
      "Save up to 10+ routines",
      "Personalized Recommendations (with quiz)",
      "Full product details and analysis",
      "Full ingredient information and analysis",
    ],
  },
];
