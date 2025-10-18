// export const dynamic = "force-dynamic";
// export const revalidate = 0;
// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import redis from "@/lib/redis";

// const GUEST_LIMIT = 5;
// const TTL_SECONDS = 24 * 60 * 60; // 24 hours

// export async function POST(req: NextRequest) {
//   try {
//     // Parse request body
//     const body = await req.json();
//     let guestSession = body.guestSession;

//     // If no guestSession provided, generate a new one
//     if (!guestSession) {
//       console.log("First time generate guest session via body");
//       guestSession = uuidv4();

//       // Initialize Redis counter
//       await redis.set(`guest_search_${guestSession}`, 0, "EX", TTL_SECONDS);

//       const response = NextResponse.json({
//         success: true,
//         message: "Guest session created",
//         guestSession, // return to client for future requests
//       });

//       // Optionally set cookie for convenience
//       response.cookies.set("guest_session", guestSession, {
//         httpOnly: true,
//         path: "/",
//         maxAge: TTL_SECONDS,
//         sameSite: "lax",
//         secure: process.env.NODE_ENV === "production",
//       });

//       return response;
//     }

//     const key = `guest_search_${guestSession}`;
//     const count = parseInt((await redis.get(key)) || "0", 10);

//     if (count >= GUEST_LIMIT) {
//       console.log("Guest reached limit");

//       return NextResponse.json({
//         success: false,
//         message: `Guest search limit reached (${GUEST_LIMIT}/24h).`,
//       });
//     }

//     // Increment usage
//     if (count === 0) {
//       await redis.set(key, 1, "EX", TTL_SECONDS);
//     } else {
//       await redis.incr(key);
//     }

//     const response = NextResponse.json({
//       success: true,
//       remaining: GUEST_LIMIT - (count + 1),
//       message: `Search recorded. You have ${
//         GUEST_LIMIT - (count + 1)
//       } searches left.`,
//       guestSession, // return so client can reuse
//     });

//     // Optionally update cookie
//     response.cookies.set("guest_session", guestSession, {
//       httpOnly: true,
//       path: "/",
//       maxAge: TTL_SECONDS,
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production",
//     });

//     return response;
//   } catch (err) {
//     console.error("Guest search error:", err);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong.",
//     });
//   }
// }

export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import redis from "@/lib/redis";

const GUEST_LIMIT = 5;
const TTL_SECONDS = 24 * 60 * 60; // 24 hours

export async function POST(req: NextRequest) {
  try {
    // ✅ Check for existing cookie first
    let guestSession = req.cookies.get("guest_session")?.value;

    // Parse request body (optional)
    const body = await req.json().catch(() => ({}));
    // Fallback: body.guestSession if cookie doesn’t exist
    if (!guestSession && body?.guestSession) {
      guestSession = body.guestSession;
    }

    // ✅ If no cookie or body session, create a new one
    if (!guestSession) {
      console.log("🆕 Creating new guest session...");
      guestSession = uuidv4();
      await redis.set(`guest_search_${guestSession}`, 0, "EX", TTL_SECONDS);
    }

    // ✅ Continue logic
    const key = `guest_search_${guestSession}`;
    const count = parseInt((await redis.get(key)) || "0", 10);

    if (count >= GUEST_LIMIT) {
      return NextResponse.json({
        success: false,
        message: `Guest search limit reached (${GUEST_LIMIT}/24h).`,
      });
    }

    if (count === 0) {
      await redis.set(key, 1, "EX", TTL_SECONDS);
    } else {
      await redis.incr(key);
    }

    const response = NextResponse.json({
      success: true,
      remaining: GUEST_LIMIT - (count + 1),
      message: `Search recorded. You have ${
        GUEST_LIMIT - (count + 1)
      } searches left.`,
      guestSession,
    });

    // ✅ Always persist cookie so it's reused on refresh
    response.cookies.set("guest_session", guestSession, {
      httpOnly: true,
      path: "/",
      maxAge: TTL_SECONDS,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err) {
    console.error("Guest search error:", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
