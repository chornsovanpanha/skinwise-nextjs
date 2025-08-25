import { z } from "zod";
export const socialSchema = z.object({
  idToken: z.string().optional(),
  loginBy: z.string().optional(),
});
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().optional(),
});

export const extendedLoginSchema = loginSchema.and(socialSchema);
export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(25, { message: "First name must be less then 25 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less then 50 characters" }),
});
export const extendedRegisterSchema = registerSchema.and(socialSchema);

export const forgetPasswordSchema = loginSchema.pick({
  email: true,
});
export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "Passwords don't match",
    path: ["confirmpassword"],
  });

export const emailSchema = z.object({
  email: z.string().email(),
});

export type EmailSchemaType = z.infer<typeof emailSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export type RegisterSchemaType = z.infer<typeof extendedRegisterSchema>;
export type LoginSchemaType = z.infer<typeof extendedLoginSchema>;
