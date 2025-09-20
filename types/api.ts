export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}

export interface AuthResponse {
  id: number;
  platform: string;
  loginBy: "email" | "google" | "facebook" | string;
  name: string;
  role: string;
  photoUrl?: {
    url?: string;
  };
  email: string;
}

export type User = Partial<AuthResponse>;

export type StripeCheckoutBody = {
  priceId: string;
  userId: string;
};
