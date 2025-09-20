"use server";
import { requester } from "@/lib/axios/api";
const defaultState = {
  loading: false,
  error: "",
  data: undefined,
};

type CheckoutResponse = {
  url: string;
};
export const portalCustomerAction = async ({ userId }: { userId: string }) => {
  const { data, error, success } = await requester<CheckoutResponse>(
    "/portal",
    "POST",
    {
      userId,
    }
  );

  if (data && success) {
    return { ...defaultState, data: data?.url, success: true };
  }

  return { ...defaultState, error, success: false };
};
