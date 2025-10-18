import { AppEnv } from "@/config/env";
import { requester } from "@/lib/axios/api";
import { defaultState } from "@/lib/axios/data";
import { parseSetCookie } from "@/lib/sessions/cookie";
import { UserTrackResponse } from "@/types/response";

export async function trackUserSearch() {
  const { data, error, success } = await requester<UserTrackResponse | null>(
    "/track",
    "GET"
  );

  console.log("message is", data?.message);

  if (data && success) {
    return { ...defaultState, data, success: true };
  }

  return { ...defaultState, error: error ?? "N/A", success: false };
}

export async function trackAndSetGuestSearch(guestCookie?: string) {
  try {
    const res = await fetch(`${AppEnv.apiUrl}/api/track/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      credentials: "include",
      body: JSON.stringify({ guestSession: guestCookie }),
    });

    if (!res.ok) throw new Error("Failed to track user");
    const data = await res.json();
    // Get all set-cookie headers
    const setCookie = res.headers.get("set-cookie");

    console.log("Set-Cookie header:", setCookie);
    const parsed = parseSetCookie(setCookie, "guest_session");
    if (parsed?.value) {
      console.log("Guest is", parsed?.value);
    }
    console.log(data);
    return { success: data?.success, data: parsed?.value };
  } catch (error) {
    console.error("Error tracking user:", error);
    return { success: false, error };
  }
}
