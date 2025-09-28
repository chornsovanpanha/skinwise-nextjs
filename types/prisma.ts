import { Prisma, Product } from "@prisma/client";
import { UserRole } from "./api";
import { Brand } from "./data";

export type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;

export type LoginBy = "email" | "facebook" | "gmail" | "apple";

// types.ts
// Routine
export enum RoutineType {
  MORNING = "MORNING",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
  CUSTOM = "CUSTOM",
}

// Product / Ingredient
export enum EffectType {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
}

// Subscription / Plan
export enum PlanType {
  FREE = "FREE",
  PRO = "PRO",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  NEW = "NEW",
  CANCELED = "CANCELED",
}

export interface Image {
  id: number;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
  createdAt: Date;
  userId?: number;
  productId?: number;
  ingredientId?: number;
}

export interface Subscription {
  id: number;
  userId: number;
  stripeId?: string;
  stripePriceId?: string;
  plan?: PlanType;
  status?: SubscriptionStatus;
  startedAt: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  platform?: string;
  loginBy: LoginBy;
  role: UserRole;
  subscription?: Subscription | null;
  Image?: Image[];
}
export type ProductWithBrandAndImages = Prisma.ProductGetPayload<{
  include: {
    Image: true;
    brand: true;
  };
}>;
