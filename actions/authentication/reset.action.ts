"use server";
import { requester } from "@/lib/axios/api";
import { AuthResponse } from "@/types/api";
import { EmailSchemaType, ResetPasswordSchemaType } from "@/utils/schema";
const defaultState = {
  success: false,
  data: undefined,
  error: "",
};
export interface Response {
  data: AuthResponse;
}

export const SendEmailForgetAction = async (formData: EmailSchemaType) => {
  console.log("Call server action");
  const { data, error, success } = await requester<Response, EmailSchemaType>(
    "/auth/forgot-password",
    "POST",
    formData,
    {
      withCredentials: true,
    }
  );

  console.log("Error is", data, error);

  if (data && success) {
    return { ...defaultState, data: data.data, success: true };
  }

  return { ...defaultState, error };
};

type Form = {
  token: string;
} & ResetPasswordSchemaType & { token: string };
export const ResetPasswordAction = async (formData: Form) => {
  const { data, error, success } = await requester<
    Response,
    ResetPasswordSchemaType
  >("/auth/reset-password", "POST", formData, {
    withCredentials: true,
  });

  if (data && success) {
    return { ...defaultState, data: data.data, success: true };
  }

  return { ...defaultState, error };
};
