import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { NextResponse } from "next/server";

const FREE_USER_LIMIT = 5;
const TTL_SECONDS = 24 * 60 * 60; // 1 day

export async function GET() {
  try {
    const userId = await getUserIdFromSession();
    let user = null;
    let key = "";
    let limit = 0;

    // -----------------------------------
    // Fetch user if logged in
    // -----------------------------------
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
        return NextResponse.json({
          success: false,
          message: "User not found",
        });
      }

      // If user is PRO subscriber → unlimited access
      if (
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan === "PRO"
      ) {
        return NextResponse.json({
          success: true,
          message: "Subscribed user: unlimited searches",
          planType: user.subscription.plan,
          skinType: user.profile?.skinType || "",
          skinConcern: user.profile?.concerns?.map((item) => item.name) || [],
        });
      }

      // Set key and limit for FREE user
      key = `user_search_${user.id}`;
      limit = FREE_USER_LIMIT;
    }

    // -----------------------------------
    // Track search usage via Redis
    // -----------------------------------
    const count = parseInt((await redis.get(key)) || "0", 10);

    if (count >= limit) {
      return NextResponse.json({
        success: false,
        message: "Search limit reached. Please subscribe or wait 24 hours.",
        planType: "FREE",
        skinType: user?.profile?.skinType || "",
        skinConcern: user?.profile?.concerns?.map((item) => item.name) || [],
      });
    }

    // Increment usage
    if (count === 0) {
      await redis.set(key, 1, "EX", TTL_SECONDS);
    } else {
      await redis.incr(key);
    }

    return NextResponse.json({
      success: true,
      remaining: limit - (count + 1),
      message: `Search recorded. You have ${
        limit - (count + 1)
      } searches left.`,
      planType: "FREE",
      skinType: user?.profile?.skinType || "",
      skinConcern: user?.profile?.concerns?.map((item) => item.name) || [],
    });
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
