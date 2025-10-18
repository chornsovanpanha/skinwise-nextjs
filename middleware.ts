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

  // Protected paths (require login)
  const isProtected = protectedPaths.some((path) =>
    pathName.startsWith(pathName)
  );

  // Routes that need guest tracking
  const isGuestRoute = limitSearchPaths.some((path) =>
    pathName.startsWith(pathName)
  );

  const cookieStore = await cookies();
  const guestCookie = cookieStore.get("guest_session")?.value || null;
  const cookieValue = await getAppSession(); // logged-in user session

  // -----------------------------
  // Handle guest session tracking
  // -----------------------------

  console.log("Url pathName is", pathName);

  console.log("isGuestRoute", isGuestRoute);

  if (isGuestRoute && !cookieValue) {
    let apiResponse;

    if (!guestCookie) {
      console.log("🆕 No guest cookie — creating new guest session...");
      apiResponse = await trackAndSetGuestSearch();

      if (apiResponse.success && apiResponse.data) {
        // Set the guest cookie
        res.cookies.set("guest_session", apiResponse.data, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 24 hours
        });
        console.log("✅ Guest cookie set:", apiResponse.data);
      } else {
        console.warn("⚠️ Guest limit reached or failed to track guest.");
        return NextResponse.redirect(new URL("/pricing", url));
      }
    } else {
      console.log("✅ Reusing existing guest cookie:", guestCookie);
      apiResponse = await trackAndSetGuestSearch(guestCookie);

      if (!apiResponse.success) {
        console.warn("⚠️ Guest limit reached.");
        return NextResponse.redirect(new URL("/pricing", url));
      }
    }
  }

  // -----------------------------
  // Handle protected paths
  // -----------------------------
  const loginUrl = new URL(loginPath, url);
  if (isProtected) {
    loginUrl.searchParams.set("returnTo", pathName + url.search);
  }

  // Redirect logged-in users away from login
  if (cookieValue && pathName === loginPath) {
    return NextResponse.redirect(new URL("/", url));
  }

  // Update user session if exists
  if (cookieValue) {
    const { success, error } = await updateSession(cookieValue);
    if (!success || error) {
      return NextResponse.next();
    }
  }

  if (isProtected && !cookieValue) {
    return NextResponse.redirect(loginUrl);
  }

  // -----------------------------
  // Prevent caching of protected / guest-tracked pages
  // -----------------------------
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Vary", "Cookie"); // prevents sharing guest cookies across users

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
