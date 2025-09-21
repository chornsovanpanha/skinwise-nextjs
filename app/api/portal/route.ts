import { AppEnv } from "@/config/env";
import prismaClientTools from "@/lib/prisma";
import { getAppSession } from "@/lib/sessions/cookie";
import { stripe } from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getAppSession();
    const { userId } = await request.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("Portal customer return", userId);

    const user = await prismaClientTools.user.findUnique({
      where: { id: parseInt(userId) },
      include: { subscription: true },
    });

    if (!user || !user.subscription?.stripeId) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 401 }
      );
    }

    const origin = request.headers.get("origin") || AppEnv.apiUrl;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.subscription.stripeId,
      return_url: `${origin}/profile/overview`,
    });
    console.log(portalSession.url);
    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json(
      { error: "Error creating portal session" },
      { status: 500 }
    );
  }
}
