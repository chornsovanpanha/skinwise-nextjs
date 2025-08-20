import { clientEnvSchema, serverEnvSchema } from "@/utils/schema";
import { z } from "zod";

type ServerEnv = z.infer<typeof serverEnvSchema>;
type ClientEnv = z.infer<typeof clientEnvSchema>;

function parseEnv<T>(schema: z.Schema<T>, env: Record<string, any>): T {
  const parsed = schema.safeParse(env);
  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Missing or invalid environment variables.");
  }
  return parsed.data;
}

let serverEnv: ServerEnv | null = null;
let clientEnv: ClientEnv | null = null;

if (typeof window === "undefined") {
  serverEnv = parseEnv(serverEnvSchema, process.env);
} else {
  const envVars = {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  clientEnv = parseEnv(clientEnvSchema, envVars);
}

export class AppEnv {
  static readonly apiVersion = serverEnv?.API_VERSION!;
  static readonly port = serverEnv?.PORT!;
  static readonly databaseUrl = serverEnv?.DATABASE_URL!;
}

export class ClientAppEnv {
  static readonly NEXT_PUBLIC_FIREBASE_API_KEY =
    clientEnv?.NEXT_PUBLIC_API_KEY!;
  static readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN =
    clientEnv?.NEXT_PUBLIC_AUTH_DOMAIN!;
  static readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID =
    clientEnv?.NEXT_PUBLIC_PROJECT_ID!;
  static readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET =
    clientEnv?.NEXT_PUBLIC_STORAGE_BUCKET!;
  static readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID =
    clientEnv?.NEXT_PUBLIC_MESSAGING_SENDER_ID!;
  static readonly NEXT_PUBLIC_FIREBASE_APP_ID = clientEnv?.NEXT_PUBLIC_APP_ID!;
  static readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID =
    clientEnv?.NEXT_PUBLIC_MEASUREMENT_ID!;
}
