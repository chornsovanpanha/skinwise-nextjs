"use server";
import { requester } from "@/lib/axios/api";
import { stripePriceId } from "@/lib/stripe/stripe";
const defaultState = {
  loading: false,
  error: "",
  data: undefined,
};

type CheckoutResponse = {
  url: string;
};
export const checkoutStripeAction = async ({ userId }: { userId: string }) => {
  if (!userId) {
    return { ...defaultState, error: "User is not found", success: false };
  }
  const { data, error, success } = await requester<CheckoutResponse>(
    "/checkout",
    "POST",
    {
      priceId: stripePriceId,
      userId,
    }
  );

  if (data && success) {
    return { ...defaultState, data: data?.url, success: true };
  }

  return { ...defaultState, error, success: false };
};
