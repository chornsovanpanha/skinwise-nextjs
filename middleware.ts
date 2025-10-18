// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import { updateSession } from "./actions/authentication/login.action";
// import { trackAndSetGuestSearch } from "./actions/track/track-action";
// import { getAppSession } from "./lib/sessions/cookie";
// import { cookies } from "next/headers";

const protectedPaths = [
  "/dashboard",
  "/quiz",
  "/profile/overview",
  "/profile/edit-profile",
  "/profile/my-skin",
];

const limitSearchPaths = ["/product", "/ingredient", "/result-comparison"];
const loginPath = "/login";

// export async function middleware(request: NextRequest) {
//   const url = new URL(request.url);
//   const pathName = url.pathname;
//   const isProtected = protectedPaths.some((path) => pathName.startsWith(path));
//   const cookieValue = await getAppSession();
//   const cookieStore = await cookies();
//   const res = NextResponse.next();
//   const isRoute = limitSearchPaths.some((path) => pathName.startsWith(path));
//   // -----------------------------
//   // Handle guest cookies from API headers (if needed)
//   // -----------------------------
//   const guestCookie = cookieStore.get("guest_session")?.value ?? uuidv4();

//   /**
//    * Handle guest session tracking
//    */
//   if (isRoute && !cookieValue) {
//     // Only create a new guest session if no cookie exists
//     if (!guestCookie) {
//       console.log("🆕 Creating new guest session...");
//       const apiResponse = await trackAndSetGuestSearch();

//       if (apiResponse.success && apiResponse.data) {
//         // Set cookie once
//         res.cookies.set("guest_session", apiResponse.data, {
//           httpOnly: true,
//           path: "/",
//           sameSite: "lax",
//           secure: process.env.NODE_ENV === "production",
//           maxAge: 60 * 60 * 24, // 24h
//         });
//         console.log("✅ Guest cookie set:", apiResponse.data);
//       } else {
//         console.warn("⚠️ Guest limit reached or failed to track guest.");
//         return NextResponse.redirect(new URL("/pricing", url));
//       }

//       return res;
//     }

//     // ✅ If guest cookie exists, reuse it
//     console.log("✅ Existing guest cookie:", guestCookie);
//     const apiResponse = await trackAndSetGuestSearch(guestCookie);

//     if (!apiResponse.success) {
//       console.warn("⚠️ Guest limit reached.");
//       return NextResponse.redirect(new URL("/pricing", url));
//     }

//     return res;
//   }

//   const loginUrl = new URL(loginPath, url);
//   if (isProtected) {
//     loginUrl.searchParams.set("returnTo", pathName + url.search);
//   }

//   // Redirect logged-in users away from login
//   if (cookieValue && pathName === loginPath) {
//     return NextResponse.redirect(new URL("/", url));
//   }

//   // Update session if cookie exists
//   if (cookieValue) {
//     const { success, error } = await updateSession(cookieValue);
//     if (!success || error) {
//       return NextResponse.next();
//     }
//   }

//   if (isProtected && !cookieValue) {
//     return NextResponse.redirect(loginUrl);
//   }

//   const response = NextResponse.next();

//   if (isProtected) {
//     response.headers.set(
//       "Cache-Control",
//       "no-store, no-cache, must-revalidate, proxy-revalidate"
//     );
//     response.headers.set("Pragma", "no-cache");
//     response.headers.set("Expires", "0");
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getAppSession } from "./lib/sessions/cookie";
import { trackAndSetGuestSearch } from "./actions/track/track-action";
import { updateSession } from "./actions/authentication/login.action";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathName = url.pathname;
  const res = NextResponse.next();

  // Protected paths (require login)
  const isProtected = protectedPaths.some((path) => pathName.startsWith(path));

  // Routes that need guest tracking
  const isGuestRoute = limitSearchPaths.some((path) =>
    pathName.startsWith(path)
  );

  const cookieStore = await cookies();
  const guestCookie = cookieStore.get("guest_session")?.value || null;
  const cookieValue = await getAppSession(); // logged-in user session

  // -----------------------------
  // Handle guest session tracking
  // -----------------------------
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
