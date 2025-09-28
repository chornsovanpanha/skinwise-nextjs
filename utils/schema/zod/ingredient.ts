import z from "zod";
export const ingredientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  desc: z.string().optional(),
  about: z.string().optional(),
  alias: z.string().min(1, "Alias is required"),
});

export type IngredientFormValues = z.infer<typeof ingredientSchema>;
