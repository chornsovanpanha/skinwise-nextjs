import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./actions/authentication/login.action";
import {
  getAppSession,
  parseSetCookie,
  setGuestRateIp,
} from "./lib/sessions/cookie";

const protectedPaths = [
  "/dashboard",
  "/quiz",
  "/profile/overview",
  "/profile/edit-profile",
  "/profile/my-skin",
];
const loginPath = "/login";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathName = url.pathname;
  const isProtected = protectedPaths.some((path) => pathName.startsWith(path));
  const cookieValue = await getAppSession();

  const loginUrl = new URL(loginPath, url);
  if (isProtected) {
    loginUrl.searchParams.set("returnTo", pathName + url.search);
  }

  // Redirect logged-in users away from login
  if (cookieValue && pathName === loginPath) {
    return NextResponse.redirect(new URL("/", url));
  }

  // Update session if cookie exists
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
  // Handle guest cookies from API headers (if needed)
  // -----------------------------
  const setCookieHeader = request.cookies.getAll();
  // console.log("Middleware run", setCookieHeader);

  // if (setCookieHeader) {
  //   const parsed = parseSetCookie(setCookieHeader, "guest_id");

  //   if (parsed?.value && typeof parsed.value === "string") {
  //     console.log("Set guest ip");
  //     await setGuestRateIp("guest_id", parsed.value, parsed.maxAge);
  //   }
  // }
  const response = NextResponse.next();

  if (isProtected) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
