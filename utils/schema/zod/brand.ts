import z from "zod";

export type BrandFormValues = z.infer<typeof brandSchema>;
export type UpdateBrandFormValues = Partial<BrandFormValues>;

export const brandSchema = z
  .object({
    title: z
      .string()
      .min(3, "Brand Name is required")
      .max(50, "Brand name must be less then 50"),
    alias: z
      .string()
      .min(3, "Alias is required")
      .max(50, "Alias name must be less then 50"),
    country: z
      .string()
      .min(2, "Country name is required")
      .max(50, "Country name must be less then 50"),
  })
  .transform((data) => ({
    ...data,
    alias: data.alias
      ? data.alias.toLowerCase().replace(/\s+/g, "-")
      : data.title.toLowerCase().replace(/\s+/g, "-"),
  }));

export const updateBrandSchema = z
  .object({
    title: z
      .string()
      .min(3, "Brand Name must be at least 3 characters")
      .max(50, "Brand Name must be less than 50")
      .optional(),

    alias: z
      .string()
      .min(3, "Alias must be at least 3 characters")
      .max(50, "Alias must be less than 50")
      .optional(),

    country: z
      .string()
      .min(2, "Country name must be at least 2 characters")
      .max(4, "Country name must be less than 4")
      .optional(),
  })
  .transform((data) => ({
    ...data,
    alias: data.alias
      ? data.alias.toLowerCase().replace(/\s+/g, "-")
      : data.title
      ? data.title.toLowerCase().replace(/\s+/g, "-")
      : undefined,
  }));
