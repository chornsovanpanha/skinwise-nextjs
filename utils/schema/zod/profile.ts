import z from "zod";

export const editProfileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  bio: z.string().max(300, "Bio must be at most 300 characters").optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
