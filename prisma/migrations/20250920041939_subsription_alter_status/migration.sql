/*
  Warnings:

  - The values [EXPIRED] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[userId,stripeId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."SubscriptionStatus_new" AS ENUM ('ACTIVE', 'CANCELLED', 'NEW', 'CANCELED');
ALTER TABLE "public"."Subscription" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Subscription" ALTER COLUMN "status" TYPE "public"."SubscriptionStatus_new" USING ("status"::text::"public"."SubscriptionStatus_new");
ALTER TYPE "public"."SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "public"."SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "public"."SubscriptionStatus_old";
ALTER TABLE "public"."Subscription" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Subscription" ALTER COLUMN "stripeId" DROP NOT NULL,
ALTER COLUMN "plan" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'NEW',
ALTER COLUMN "stripePriceId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_stripeId_key" ON "public"."Subscription"("userId", "stripeId");
