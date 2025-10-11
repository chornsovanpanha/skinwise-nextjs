-- DropIndex
DROP INDEX "public"."SkinConcern_name_key";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "lastSearch" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "searchCount" INTEGER NOT NULL DEFAULT 0;
