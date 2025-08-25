import { z } from "zod";
export async function validateBody<T>(
  body: T,
  schema: z.ZodSchema<T>
): Promise<T> {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw parsed.error;
  }
  return parsed.data;
}
