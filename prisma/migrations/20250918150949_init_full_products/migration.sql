/*
  Warnings:

  - A unique constraint covering the columns `[productId,url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingredientId,url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."RoutineType" AS ENUM ('MORNING', 'EVENING', 'NIGHT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."SkinType" AS ENUM ('OILY', 'DRY', 'COMBINATION', 'NORMAL', 'SENSITIVE');

-- CreateEnum
CREATE TYPE "public"."EffectType" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "public"."SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED');

-- AlterTable
ALTER TABLE "public"."Image" ADD COLUMN     "ingredientId" INTEGER,
ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "alias" TEXT,
ADD COLUMN     "brandId" INTEGER NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."UserUsage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productViews" INTEGER NOT NULL DEFAULT 0,
    "ingredientViews" INTEGER NOT NULL DEFAULT 0,
    "lastResetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "stripeId" TEXT NOT NULL,
    "plan" "public"."PlanType" NOT NULL,
    "status" "public"."SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "desc" TEXT,
    "about" TEXT,
    "alias" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductIngredient" (
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "concentration" TEXT,
    "notes" TEXT,

    CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("productId","ingredientId")
);

-- CreateTable
CREATE TABLE "public"."InsideGroup" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "items" TEXT[],

    CONSTRAINT "InsideGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductEffect" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "type" "public"."EffectType" NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT,
    "desc" TEXT,

    CONSTRAINT "ProductEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IngredientInsideGroup" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "items" TEXT[],

    CONSTRAINT "IngredientInsideGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IngredientEffect" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "type" "public"."EffectType" NOT NULL,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT,
    "desc" TEXT,

    CONSTRAINT "IngredientEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SimilarIngredient" (
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,

    CONSTRAINT "SimilarIngredient_pkey" PRIMARY KEY ("fromId","toId")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "skinType" "public"."SkinType",
    "allergies" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SkinConcern" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkinConcern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Routine" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "type" "public"."RoutineType" NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RoutineItem" (
    "id" SERIAL NOT NULL,
    "routineId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "step" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "RoutineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ProfileConcerns" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProfileConcerns_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserUsage_userId_key" ON "public"."UserUsage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "public"."Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeId_key" ON "public"."Subscription"("stripeId");

-- CreateIndex
CREATE INDEX "Ingredient_name_idx" ON "public"."Ingredient"("name");

-- CreateIndex
CREATE INDEX "Ingredient_alias_idx" ON "public"."Ingredient"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "public"."Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SkinConcern_name_key" ON "public"."SkinConcern"("name");

-- CreateIndex
CREATE INDEX "_ProfileConcerns_B_index" ON "public"."_ProfileConcerns"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Image_productId_url_key" ON "public"."Image"("productId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "Image_ingredientId_url_key" ON "public"."Image"("ingredientId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "public"."Product"("code");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "public"."Product"("name");

-- CreateIndex
CREATE INDEX "Product_alias_idx" ON "public"."Product"("alias");

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserUsage" ADD CONSTRAINT "UserUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductIngredient" ADD CONSTRAINT "ProductIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InsideGroup" ADD CONSTRAINT "InsideGroup_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductEffect" ADD CONSTRAINT "ProductEffect_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IngredientInsideGroup" ADD CONSTRAINT "IngredientInsideGroup_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IngredientEffect" ADD CONSTRAINT "IngredientEffect_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "public"."Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SimilarIngredient" ADD CONSTRAINT "SimilarIngredient_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SimilarIngredient" ADD CONSTRAINT "SimilarIngredient_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Routine" ADD CONSTRAINT "Routine_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoutineItem" ADD CONSTRAINT "RoutineItem_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "public"."Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RoutineItem" ADD CONSTRAINT "RoutineItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProfileConcerns" ADD CONSTRAINT "_ProfileConcerns_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProfileConcerns" ADD CONSTRAINT "_ProfileConcerns_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."SkinConcern"("id") ON DELETE CASCADE ON UPDATE CASCADE;
