import { Prisma } from "@prisma/client";

export type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;

export type Subscription = Prisma.SubscriptionGetPayload<{
  select: { plan: true };
}>;

export type LoginBy = "email" | "facebook" | "gmail" | "apple";
