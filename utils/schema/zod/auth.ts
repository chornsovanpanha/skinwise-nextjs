import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgetPasswordSchema = loginSchema.pick({
  email: true,
});
export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    confirmpassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.confirmpassword === data.password, {
    error: "Passwords don't match",
    path: ["confirmpassword"],
  });

export const oAuthCodeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code must be 6 digits" })
    .max(6, { message: "Code must be less then 6 digits" })
    .refine((val) => /^\d{6}$/.test(val), {
      message: "Code must contain only numbers",
    }),
});

export const recoveryCodeSchema = z.object({
  code: z
    .string()
    .min(9, { message: "Recovery code must be 9 digits" })
    .max(10, { message: "Recovery code must be less then 10 digits" }),
});
