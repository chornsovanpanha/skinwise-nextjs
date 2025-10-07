"use server";
import { requester } from "@/lib/axios/api";
import { parseSetCookie, setAppSession } from "@/lib/sessions/cookie";
import { clearUserCookie, setUserSessionCookie } from "@/lib/sessions/session";
import { UserPrisma } from "@/types";
import { SESSION_NAME } from "@/utils/constant/cookie";
import { LoginSchemaType } from "@/utils/schema";
const defaultState = {
  success: false,
  data: undefined,
  error: "",
};
export interface LoginResponse {
  data: UserPrisma;
}
type LoginParams = {
  loginBy?: string;
  idToken?: string;
  name?: string;
  photoUrl?: string;
} & LoginSchemaType;

export const LoginAction = async (
  formData: LoginParams
): Promise<{ data?: UserPrisma; success: boolean; error?: string }> => {
  const { data, error, success, headers } = await requester<
    LoginResponse,
    LoginSchemaType
  >("/auth/login", "POST", formData, { withCredentials: true });
  const setCookieHeader = headers?.["set-cookie"];
  if (data && success) {
    const parsed = parseSetCookie(setCookieHeader, SESSION_NAME);
    if (parsed?.value) {
      await setAppSession(parsed?.value, parsed.maxAge);
      await setUserSessionCookie(data.data.id?.toString() ?? "", parsed.maxAge);
    }
    return { ...defaultState, data: data.data, success: true };
  }

  return { ...defaultState, error: error ?? "N/A", success: false };
};

export const updateSession = async (cookie: string) => {
  const { data, error, success, headers } = await requester<
    LoginResponse,
    LoginSchemaType
  >("/auth/update-me", "POST", undefined, {
    withCredentials: true,
    headers: {
      Cookie: `${SESSION_NAME}=${cookie}`,
    },
  });

  const setCookieHeader = headers?.["set-cookie"];

  if (data && success) {
    const parsed = parseSetCookie(setCookieHeader, SESSION_NAME);

    if (parsed?.value) {
      await setAppSession(parsed?.value, parsed.maxAge);
      await setUserSessionCookie(
        data.data?.id?.toString() ?? "",
        parsed.maxAge
      );
    }
    return { ...defaultState, data: data.data, success: true };
  } else {
    await setAppSession(SESSION_NAME, 0);
    await clearUserCookie();
  }

  return { ...defaultState, error };
};
