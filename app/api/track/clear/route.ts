import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

async function clearAllKeys() {
  await redis.flushall();
  console.log("All keys cleared");
}
export async function GET(req: NextRequest) {
  try {
    // Get IP from x-forwarded-for (set by Vercel or other proxies)
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0].trim() || "guest";
    console.log("Ip address is", ip);
    const key = `guest_search_${ip}`;
    await redis.del(key);
    await clearAllKeys();
    return NextResponse.json({
      success: true,
      message: "Redis user ip has been clear",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
