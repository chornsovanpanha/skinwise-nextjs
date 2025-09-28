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
