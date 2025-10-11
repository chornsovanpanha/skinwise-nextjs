import z from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  bio: z.string().max(300, "Bio must be at most 300 characters").optional(),
});

export const skinFormSchema = z.object({
  skinType: z.string().nonempty("Please select your skin type"),
  concerns: z.array(z.string()).min(1, "Please select at least one concern"),
});

export type SkinFormValues = z.infer<typeof skinFormSchema>;

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
