import prisma from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { PlanType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await getUserIdFromSession();
    if (userId) {
      const user = await prisma.user.findUnique({
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
    }
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
