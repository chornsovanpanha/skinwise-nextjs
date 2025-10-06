import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { NextRequest, NextResponse } from "next/server";

const FREE_USER_LIMIT = 5;
const GUEST_LIMIT = 5;
const TTL_SECONDS = 1 * 24 * 60 * 60;
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();

    let key: string;
    let limit: number;

    // -----------------------------
    // Logged-in user
    // -----------------------------
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: { subscription: true },
      });

      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" });
      }

      // Subscribed user → unlimited
      if (
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan == "PRO"
      ) {
        return NextResponse.json({
          success: true,
          message: "Subscribed user: unlimited searches",
        });
      }

      // Free user → track in Redis
      key = `user_search_${user.id}`;
      limit = FREE_USER_LIMIT;
    } else {
      // -----------------------------
      // Guest user
      // -----------------------------
      const forwardedFor = req.headers.get("x-forwarded-for") || "";
      const ip = forwardedFor.split(",")[0].trim() || `guest_local`;

      key = `guest_search_${ip}`;
      limit = GUEST_LIMIT;
    }

    // -----------------------------
    // 3Track searches in Redis
    // -----------------------------
    const count = parseInt((await redis.get(key)) || "0", 10);

    if (count >= limit) {
      return NextResponse.json({
        success: false,
        message: "Search limit reached. Please subscribe or wait 30 days.",
      });
    }

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
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
