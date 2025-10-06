"use server";

import { fetcher } from "@/lib/axios/api";
import { defaultState } from "@/lib/axios/data";
import { UserTrackResponse } from "@/types/response";

export async function trackUserSearch() {
  const { data, error, success } = await fetcher<UserTrackResponse | null>(
    "/track"
  );
  console.log("Redis response", data);
  if (data && success) {
    return { ...defaultState, data: data, success: true };
  }

  return { ...defaultState, error: error ?? "N/A", success: false };
}
