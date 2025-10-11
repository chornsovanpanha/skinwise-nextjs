/*
  Warnings:

  - You are about to drop the column `items` on the `IngredientInsideGroup` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `InsideGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Ingredient" ADD COLUMN     "searchCount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."IngredientInsideGroup" DROP COLUMN "items";

-- AlterTable
ALTER TABLE "public"."InsideGroup" DROP COLUMN "items";
