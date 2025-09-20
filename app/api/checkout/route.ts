import { withAuth } from "@/lib/middleware/with-auth";
import prismaClientTools from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { StripeCheckoutBody } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const handler = async (request: NextRequest) => {
  try {
    const { priceId, userId } = (await request.json()) as StripeCheckoutBody;

    if (!userId) {
      return NextResponse.json(
        { error: "User is not authorized" },
        { status: 401 }
      );
    }

    // Find user with subscription
    const user = await prismaClientTools.user.findUnique({
      where: { id: parseInt(userId) },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let customerId = user.subscription?.stripeId;

    // Create Stripe customer if missing
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      });
      customerId = customer.id;

      // Upsert subscription in Prisma (required fields)
      await prismaClientTools.user.update({
        where: { id: user.id },
        data: {
          subscription: {
            upsert: {
              create: {
                stripeId: customerId,
                stripePriceId: priceId,
              },
              update: { stripeId: customerId },
            },
          },
        },
      });
    }

    // Create Stripe Checkout session
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        priceId,
      },
      success_url: `${origin}/`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

export const POST = withAuth(handler);
