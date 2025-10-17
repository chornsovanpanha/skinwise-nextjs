-- DropForeignKey
ALTER TABLE "public"."RoutineItem" DROP CONSTRAINT "RoutineItem_routineId_fkey";

-- AddForeignKey
ALTER TABLE "RoutineItem" ADD CONSTRAINT "RoutineItem_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
