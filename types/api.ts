import { SkinType } from "@prisma/client";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}

export type AuthResponse = {
  name: string | null;
  email: string;
  bio: string | null;
  id?: string;
  platform?: string | null;
  loginBy: "email" | "google" | "facebook" | string;
  role: string;
  photoUrl?: { url?: string };
  skinConcerns?: string[];
  skinType?: SkinType | null;
};

export type UserResponse = Partial<AuthResponse>;

export type StripeCheckoutBody = {
  priceId: string;
  userId: string;
};

export type Params = { params: { id: string } };

export type PaginationMeta = {
  totalRecords: number;
  totalPages: number;
  page: number;
  perPage: number;
};
