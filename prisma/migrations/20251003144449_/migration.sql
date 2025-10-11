/*
  Warnings:

  - The values [CUSTOM] on the enum `RoutineType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `notes` on the `RoutineItem` table. All the data in the column will be lost.
  - You are about to drop the column `step` on the `RoutineItem` table. All the data in the column will be lost.
  - Added the required column `usage` to the `RoutineItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoutineType_new" AS ENUM ('MORNING', 'EVENING', 'NIGHT', 'BOTH');
ALTER TABLE "Routine" ALTER COLUMN "type" TYPE "RoutineType_new" USING ("type"::text::"RoutineType_new");
ALTER TYPE "RoutineType" RENAME TO "RoutineType_old";
ALTER TYPE "RoutineType_new" RENAME TO "RoutineType";
DROP TYPE "public"."RoutineType_old";
COMMIT;

-- AlterTable
ALTER TABLE "RoutineItem" DROP COLUMN "notes",
DROP COLUMN "step",
ADD COLUMN     "usage" TEXT NOT NULL;
