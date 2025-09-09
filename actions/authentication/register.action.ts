"use server";
import { requester } from "@/lib/axios/api";
import { parseSetCookie, setAppSession } from "@/lib/sessions/cookie";
import { AuthResponse } from "@/types/api";
import { SESSION_NAME } from "@/utils/constant/cookie";
import { RegisterSchemaType } from "@/utils/schema";
const defaultState = {
  success: false,
  data: undefined,
  error: "",
};
export interface RegisterResponse {
  data: AuthResponse;
}

export const RegisterAction = async (formData: RegisterSchemaType) => {
  const { data, error, success, headers } = await requester<
    RegisterResponse,
    RegisterSchemaType
  >("/auth/register", "POST", formData, {
    withCredentials: true,
  });

  const setCookieHeader = headers?.["set-cookie"];

  if (data && success) {
    const parsed = parseSetCookie(setCookieHeader, SESSION_NAME);
    console.log("Data is", parsed);
    parsed?.value && (await setAppSession(parsed?.value, parsed.maxAge));
    return { ...defaultState, data: data.data, success: true };
  }

  return { ...defaultState, error };
};
