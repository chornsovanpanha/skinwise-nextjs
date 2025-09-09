import { SESSION_NAME } from "@/utils/constant/cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const getAppSession = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_NAME)?.value ?? null;
};

export const setAppSession = async (value: string, maxAge?: number) => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_NAME, value, {
    maxAge,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
};
export const clearAppSession = (): NextResponse => {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_NAME);
  return response;
};

export function getCookieFromHeader(
  header: string | string[] | null | undefined,
  name: string
): string | null {
  if (!header) return null;

  const cookies = Array.isArray(header) ? header : [header];

  for (const cookieString of cookies) {
    const parts = cookieString.split(";").map((c) => c.trim());
    for (const part of parts) {
      const [key, ...valueParts] = part.split("=");
      if (key === name) {
        return decodeURIComponent(valueParts.join("="));
      }
    }
  }

  return null;
}

export function parseSetCookie(
  header: string | string[] | null | undefined,
  name: string
): { value: string; maxAge?: number; expires?: string } | null {
  if (!header) return null;

  const cookies = Array.isArray(header) ? header : [header];

  for (const cookieString of cookies) {
    const parts = cookieString.split(";").map((c) => c.trim());
    const [cookieName, ...cookieValueParts] = parts[0].split("=");

    if (cookieName === name) {
      let maxAge: number | undefined;
      let expires: string | undefined;

      for (let i = 1; i < parts.length; i++) {
        const [attrKey, ...attrValueParts] = parts[i].split("=");
        const key = attrKey.toLowerCase();
        const val = attrValueParts.join("=");

        if (key === "max-age") {
          maxAge = parseInt(val, 10);
        }
        if (key === "expires") {
          expires = val;
        }
      }

      return {
        value: decodeURIComponent(cookieValueParts.join("=")),
        maxAge,
        expires,
      };
    }
  }

  return null;
}
