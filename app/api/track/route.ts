// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { PlanType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const FREE_USER_LIMIT = 5;
const GUEST_LIMIT = 5;
const TTL_SECONDS = 24 * 60 * 60; // 1 day

// -----------------------------
// Helper: Get partial IP
// -----------------------------
function getPartialIP(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = (forwarded?.split(",")[0] || realIp || "guest_local").trim();

  if (ip.includes(".")) return ip.split(".").slice(0, 3).join("."); // IPv4
  if (ip.includes(":")) return ip.split(":").slice(0, 3).join(":"); // IPv6
  return ip;
}

// -----------------------------
// Main GET handler
// -----------------------------
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromSession();
    let key: string;
    let limit: number;
    let user;

    // -----------------------------
    // Logged-in user
    // -----------------------------
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: {
          subscription: true,
          profile: { include: { concerns: true } },
        },
      });

      if (!user)
        return NextResponse.json({ success: false, message: "User not found" });

      if (
        user.subscription?.status === "ACTIVE" &&
        user.subscription?.plan === "PRO"
      ) {
        return NextResponse.json({
          success: true,
          message: "Subscribed user: unlimited searches",
          planType: user.subscription.plan,
          skinType: user.profile?.skinType,
          skinConcern: user.profile?.concerns?.map((c) => c.name),
        });
      }

      key = `user_search_${user.id}`;
      limit = FREE_USER_LIMIT;
    } else {
      // -----------------------------
      // Guest user → partial IP + guest cookie
      // -----------------------------
      const partialIp = getPartialIP(req);

      key = `guest_search_${partialIp}`;
      limit = GUEST_LIMIT;
    }

    // -----------------------------
    // Track usage in Redis
    // -----------------------------
    const count = parseInt((await redis.get(key)) || "0", 10);

    if (count >= limit) {
      return NextResponse.json({
        success: false,
        message: `Search limit reached. Please subscribe or wait ${
          TTL_SECONDS / (24 * 60 * 60)
        } days.`,
        planType: user ? PlanType.FREE : PlanType.PRO,
        skinType: user?.profile?.skinType,
        skinConcern: user?.profile?.concerns?.map((c) => c.name),
      });
    }

    await (count === 0
      ? redis.set(key, 1, "EX", TTL_SECONDS)
      : redis.incr(key));

    return NextResponse.json({
      success: true,
      remaining: limit - (count + 1),
      message: `Search recorded. You have ${
        limit - (count + 1)
      } searches left.`,
      planType: user ? PlanType.FREE : PlanType.PRO,
      skinType: user?.profile?.skinType,
      skinConcern: user?.profile?.concerns?.map((c) => c.name),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
      planType: PlanType.FREE,
      skinType: "",
      skinConcern: [],
    });
  }
}
