import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { updateSession } from "./actions/authentication/login.action";
import { trackAndSetGuestSearch } from "./actions/track/track-action";
import { getAppSession } from "./lib/sessions/cookie";
import { cookies } from "next/headers";

const protectedPaths = [
  "/dashboard",
  "/quiz",
  "/profile/overview",
  "/profile/edit-profile",
  "/profile/my-skin",
];

const limitSearchPaths = ["/product", "/ingredient", "/result-comparison"];
const loginPath = "/login";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathName = url.pathname;
  const isProtected = protectedPaths.some((path) => pathName.startsWith(path));
  const cookieValue = await getAppSession();
  const cookieStore = await cookies();
  const res = NextResponse.next();
  const isRoute = limitSearchPaths.some((path) => pathName.startsWith(path));
  // -----------------------------
  // Handle guest cookies from API headers (if needed)
  // -----------------------------
  const guestCookie = cookieStore.get("guest_session")?.value ?? uuidv4();

  if (isRoute && !cookieValue) {
    console.log("call again", guestCookie);
    const apiResponse = await trackAndSetGuestSearch(guestCookie);
    console.log("Track guest user middle ware run", apiResponse.data);
    if (apiResponse.data && apiResponse.success) {
      res.cookies.set("guest_session", apiResponse.data, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV == "production",
        maxAge: 60 * 60 * 24,
      });
    }
    if (!apiResponse.success) {
      return NextResponse.redirect(new URL("/pricing", url));
    }

    return res;
  }
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
