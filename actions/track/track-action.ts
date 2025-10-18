import { requester } from "@/lib/axios/api";
import { defaultState } from "@/lib/axios/data";
import { UserTrackResponse } from "@/types/response";

export async function trackUserSearch() {
  const { data, error, success, headers } =
    await requester<UserTrackResponse | null>("/track", "GET");

  if (data && success) {
    const setCookieHeader = headers?.["set-cookie"];
    console.log(setCookieHeader);
    if (setCookieHeader) {
      // const parsed = parseSetCookie(setCookieHeader, "guest_id");
      // console.log("Cookie parse is", parsed);
    }
    return { ...defaultState, data, success: true };
  }

  return { ...defaultState, error: error ?? "N/A", success: false };
}
