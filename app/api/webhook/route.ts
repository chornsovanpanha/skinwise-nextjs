import prismaClientTools from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { SubscriptionStatus } from "@/types";
import { sendEmail } from "@/utils/node-mailer/send-email";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const stripeToInternalStatus: Record<string, SubscriptionStatus> = {
  active: SubscriptionStatus.ACTIVE,
  trialing: SubscriptionStatus.NEW, // Treat trialing as NEW
  incomplete: SubscriptionStatus.NEW, // New subscription in progress
  incomplete_expired: SubscriptionStatus.CANCELED,
  past_due: SubscriptionStatus.ACTIVE, // Could treat as ACTIVE
  canceled: SubscriptionStatus.CANCELED,
  unpaid: SubscriptionStatus.CANCELED, // Treat unpaid as canceled
  paused: SubscriptionStatus.ACTIVE, // Optional: treat paused as active
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed: ", error);
    return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const priceId = session.metadata?.priceId;

        if (userId && priceId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          await prismaClientTools.subscription.upsert({
            where: { userId: parseInt(userId) },
            create: {
              stripeId: subscription.id,
              stripePriceId: priceId,
              plan: "PRO",
              status: "ACTIVE",
              startedAt: new Date(),
              endedAt: new Date(
                subscription.items.data[0].current_period_end * 1000
              ),
              userId: parseInt(userId),
            },
            update: {
              stripePriceId: priceId,
              plan: "PRO",
              status: "ACTIVE",
              startedAt: new Date(),
              endedAt: new Date(
                subscription.items.data[0].current_period_end * 1000
              ),
            },
          });
        }
        break;
      }

      /**
       * Subscription updated (status changes, renewals, trial ending, etc.)
       */
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeId = subscription.id;
        const user = await prismaClientTools.subscription.findFirst({
          where: { stripeId },
        });

        if (user) {
          const stripeStatus: Stripe.Subscription.Status = subscription.status;
          const status: SubscriptionStatus =
            stripeToInternalStatus[stripeStatus];

          await prismaClientTools.subscription.update({
            where: { id: user.id },
            data: {
              status: status,
              startedAt: new Date(),
              endedAt: new Date(
                subscription.items.data[0].current_period_end * 1000
              ),
            },
          });
        }
        break;
      }

      /**
       * Subscription canceled or expired
       */
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeId = subscription.id;
        const user = await prismaClientTools.subscription.findFirst({
          where: { stripeId },
        });

        if (user) {
          await prismaClientTools.subscription.update({
            where: { id: user.id },
            data: {
              status: "CANCELED",
              plan: "FREE",
              endedAt: new Date(),
            },
          });
        }
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        // Stripe will often provide customer_email directly
        const customerEmail = invoice.customer_email;
        if (customerEmail) {
          const invoiceUrl = invoice.invoice_pdf;
          await sendEmail({
            sender: {
              address: "amyjohn922@gmail.com",
              name: "Skin Wise Premiere Account",
            },
            receipients: [
              {
                address: customerEmail,
                name: customerEmail ?? "N/A",
              },
            ],
            subject: "Your Pro Account Subscription Invoice",
            message: `
<p>Hi,</p>
<p>Thank you for subscribing to <strong>Skinwise Premiere Account Pro</strong>! 🎉</p>
<p>Your payment has been successfully received.</p>
<p>You can download your invoice here:</p>
<p><a href="${invoiceUrl}">Download Invoice (PDF)</a></p>
<p>We appreciate your support and hope you enjoy the premium experience!</p>
<p>— The Skinwise Team</p>
`,
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        const customerEmail = invoice.customer_email;

        if (customerEmail) {
          await sendEmail({
            sender: {
              address: "amyjohn922@gmail.com",
              name: "Skin Wise Premiere Account",
            },
            receipients: [
              {
                address: customerEmail,
                name: customerEmail ?? "N/A",
              },
            ],
            subject: "Payment Failed for Your Subscription",
            message: `
        <p>Hi,</p>
        <p>We attempted to charge your saved payment method, but the payment failed.</p>
        <p>Please update your billing information</a> 
        to avoid interruption of your <b>Skin Wise Pro Account</b> subscription.</p>
        <p>If no action is taken, your subscription may be canceled.</p>
      `,
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook: ", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}
