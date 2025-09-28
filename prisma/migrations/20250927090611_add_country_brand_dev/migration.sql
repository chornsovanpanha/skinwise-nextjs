/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Brand" ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "public"."Category";
