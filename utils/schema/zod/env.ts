import z from "zod";

export const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  API_VERSION: z.string().default("development"),
  PORT: z
    .string()
    .transform(Number)
    .refine((n) => !Number.isNaN(n), { message: "PORT must be a number" }),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  API_URL: z.string().url("API must be a valid URL"),

  STRIPE_SECRET_APIKEY: z
    .string()
    .min(1, "STRIPE_SECRET_APIKEY must be a valid URL"),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .min(1, "STRIPE_WEBHOOK_SECRET must be a valid URL"),
  STRIPE_PRICEID_MONTHLY: z
    .string()
    .min(1, "STRIPE_PRICEID_MONTHLY must be a valid URL"),
});
// Firebase public env vars
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_KEY: z.string().min(1, "Firebase API key is required"),
  NEXT_PUBLIC_AUTH_DOMAIN: z
    .string()
    .min(1, "Firebase Auth Domain is required"),
  NEXT_PUBLIC_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  NEXT_PUBLIC_STORAGE_BUCKET: z
    .string()
    .min(1, "Firebase Storage Bucket is required"),
  NEXT_PUBLIC_MESSAGING_SENDER_ID: z
    .string()
    .min(1, "Firebase Messaging Sender ID is required"),
  NEXT_PUBLIC_APP_ID: z.string().min(1, "Firebase App ID is required"),
  NEXT_PUBLIC_MEASUREMENT_ID: z
    .string()
    .min(1, "Firebase Measurement ID is required"),
});
