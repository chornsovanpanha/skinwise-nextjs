"use server";
import { defaultState } from "@/app/(auth)/components/form";
import { requester } from "@/lib/axios/api";
import { getAppSession, setAppSession } from "@/lib/sessions/cookie";
import { clearUserCookie, setUserSessionCookie } from "@/lib/sessions/session";
import { AuthResponse } from "@/types/api";
import { SESSION_NAME } from "@/utils/constant/cookie";
export interface LogoutResponse {
  data: AuthResponse;
}
export const LogoutAction = async () => {
  const cookie = await getAppSession();
  const { data, error, success } = await requester<LogoutResponse>(
    "/auth/logout",
    "POST",
    undefined,
    {
      withCredentials: true,
      headers: {
        Cookie: `${SESSION_NAME}=${cookie}`,
      },
    }
  );

  if (data && success) {
    await setAppSession(SESSION_NAME, 0);
    await setUserSessionCookie("", 0);
    await clearUserCookie();

    return { ...defaultState, data: data.data, success: true };
  }

  return { ...defaultState, error };
};
