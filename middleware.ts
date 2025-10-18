const protectedPaths = [
  "/dashboard",
  "/quiz",
  "/profile/overview",
  "/profile/edit-profile",
  "/profile/my-skin",
];

const loginPath = "/login";
const limitSearchPaths = ["/product", "/ingredient", "/result-comparison"];

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./actions/authentication/login.action";
import { trackAndSetGuestSearch } from "./actions/track/track-action";
import { getAppSession } from "./lib/sessions/cookie";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathName = url.pathname;
  const res = NextResponse.next();

  // -----------------------------
  // Path checks
  // -----------------------------
  const isProtected = protectedPaths.some((path) => pathName.startsWith(path));
  const isGuestRoute = limitSearchPaths.some((path) =>
    pathName.startsWith(path)
  );

  const cookieStore = await cookies();
  const guestCookie = cookieStore.get("guest_session")?.value || null;
  const cookieValue = await getAppSession(); // logged-in user session

  // -----------------------------
  // Guest session tracking
  // -----------------------------

  console.log("Path is", pathName);
  console.log("isGuestRoute is", isGuestRoute);
  if (isGuestRoute && !cookieValue) {
    let apiResponse;

    if (!guestCookie) {
      apiResponse = await trackAndSetGuestSearch();
      if (apiResponse.success && apiResponse.data) {
        res.cookies.set("guest_session", apiResponse.data, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24,
        });
      } else {
        return NextResponse.redirect(new URL("/pricing", url));
      }
    } else {
      apiResponse = await trackAndSetGuestSearch(guestCookie);
      if (!apiResponse.success) {
        return NextResponse.redirect(new URL("/pricing", url));
      }
    }
  }

  // -----------------------------
  // Protected paths
  // -----------------------------
  if (isProtected && !cookieValue) {
    const loginUrl = new URL(loginPath, url);
    loginUrl.searchParams.set("returnTo", pathName + url.search);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from login
  if (cookieValue && pathName === loginPath) {
    return NextResponse.redirect(new URL("/", url));
  }

  // Update session if user logged in
  if (cookieValue) {
    await updateSession(cookieValue);
  }

  // -----------------------------
  // Prevent caching
  // -----------------------------
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Vary", "Cookie");

  return res;
}
