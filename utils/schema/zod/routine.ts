import { RoutineType } from "@prisma/client";
import z from "zod";

export const routineUserSchema = z.object({
  usage: z.array(z.string().min(1)).min(1, "At least one date is required"),
  type: z
    .nativeEnum(RoutineType)
    .refine((val) => Object.values(RoutineType).includes(val), {
      message: "Type must be one of: MORNING, EVENING, NIGHT, or CUSTOM",
    }),
});

export type FormValueRoutine = z.infer<typeof routineUserSchema>;
