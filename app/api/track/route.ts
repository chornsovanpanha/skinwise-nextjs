import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const FREE_USER_LIMIT = 5;
const GUEST_LIMIT = 5;
const TTL_SECONDS = 1 * 24 * 60 * 60;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = await getUserIdFromSession();

    let key: string;
    let limit: number;
    let user;
    let setGuestCookie = false;

    // -----------------------------
    // Logged-in user
    // -----------------------------
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: {
          subscription: true,
          profile: {
            include: {
              concerns: true,
            },
          },
        },
      });

      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" });
      }

      // Subscribed user → unlimited
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

      key = `user_search_${user.id}`;
      limit = FREE_USER_LIMIT;
    } else {
      // -----------------------------
      // Guest user
      // -----------------------------
      let guestId = cookieStore.get("guest_id")?.value;

      if (!guestId) {
        guestId = uuidv4();
        setGuestCookie = true;
      }

      key = `guest_search_${guestId}`;
      limit = GUEST_LIMIT;
    }

    // -----------------------------
    // Track usage in Redis
    // -----------------------------
    const count = parseInt((await redis.get(key)) || "0", 10);

    if (count >= limit) {
      return NextResponse.json({
        success: false,
        message: "Search limit reached. Please subscribe or wait 24 hours.",
        planType: "FREE",
        skinConcern: user?.profile?.concerns?.map((item) => item.name),
        skinType: user?.profile?.skinType,
      });
    }

    if (count === 0) {
      await redis.set(key, 1, "EX", TTL_SECONDS);
    } else {
      await redis.incr(key);
    }

    const res = NextResponse.json({
      success: true,
      remaining: limit - (count + 1),
      message: `Search recorded. You have ${
        limit - (count + 1)
      } searches left.`,
      planType: "FREE",
      skinType: user?.profile?.skinType,
      skinConcern: user?.profile?.concerns?.map((item) => item.name),
    });

    // -----------------------------
    // Set guest cookie if needed
    // -----------------------------
    if (setGuestCookie) {
      res.cookies.set("guest_id", uuidv4(), {
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
