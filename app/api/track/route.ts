import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const FREE_USER_LIMIT = 5;
const GUEST_LIMIT = 5;
const TTL_SECONDS = 24 * 60 * 60; // 24 hours in seconds

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = await getUserIdFromSession();

    let guestId: string | undefined;
    let key: string;
    let limit: number;
    let user;
    let setGuestCookie = false;

    if (userId) {
      // Logged-in user: fetch user and subscription info
      user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: {
          subscription: true,
          profile: { include: { concerns: true } },
        },
      });

      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found",
        });
      }

      // PRO subscribers have unlimited searches
      if (
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan === "PRO"
      ) {
        return NextResponse.json({
          success: true,
          message: "Subscribed user: unlimited searches",
          planType: user.subscription.plan,
          skinType: user.profile?.skinType,
          skinConcern: user.profile?.concerns?.map((item) => item.name),
        });
      }

      // All other logged-in users (free or no subscription) limited to FREE_USER_LIMIT
      key = `user_search_${user.id}`;
      limit = FREE_USER_LIMIT;
    } else {
      // Guest user: check for guest_id cookie or create a new one
      guestId = cookieStore.get("guest_id")?.value;

      if (!guestId) {
        guestId = uuidv4();
        setGuestCookie = true;
      }

      key = `guest_search_${guestId}`;
      limit = GUEST_LIMIT;
    }

    // Check current usage count from Redis
    const count = parseInt((await redis.get(key)) || "0", 10);

    if (count >= limit) {
      return NextResponse.json({
        success: false,
        message: "Search limit reached. Please subscribe or wait 24 hours.",
        planType: user ? "FREE" : "GUEST",
        skinConcern: user?.profile?.concerns?.map((item) => item.name),
        skinType: user?.profile?.skinType,
      });
    }

    // Increment or set initial count with expiration (TTL)
    if (count === 0) {
      await redis.set(key, 1, "EX", TTL_SECONDS);
    } else {
      await redis.incr(key);
    }

    // Prepare successful response
    const res = NextResponse.json({
      success: true,
      remaining: limit - (count + 1),
      message: `Search recorded. You have ${
        limit - (count + 1)
      } searches left.`,
      planType: user ? "FREE" : "GUEST",
      skinType: user?.profile?.skinType,
      skinConcern: user?.profile?.concerns?.map((item) => item.name),
    });

    // Set guest_id cookie if needed
    if (setGuestCookie && guestId) {
      res.cookies.set("guest_id", guestId, {
        httpOnly: true,
        path: "/",
        maxAge: TTL_SECONDS,
      });
    }

    return res;
  } catch (err) {
    console.error("Search Error:", err);

    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
      planType: "FREE",
      skinType: "",
      skinConcern: [],
    });
  }
}
