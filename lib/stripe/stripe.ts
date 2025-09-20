import Stripe from "stripe";

// Use your typed environment helper OR process.env
export const stripe = new Stripe(process.env.STRIPE_SECRET_APIKEY!, {
  apiVersion: "2025-08-27.basil",
});

export const stripePriceId = process.env.STRIPE_PRICEID_MONTHLY!;
