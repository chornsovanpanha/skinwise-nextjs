import { Prisma } from "@prisma/client";
import { UserRole } from "./api";

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
    ingredients: true;
  };
}>;

export type IngredientWithSimilar = Prisma.IngredientGetPayload<{
  include: {
    effects: true;
    IngredientSkinMatch: true;
    insideGroups: true;
    products: {
      include: {
        product: {
          include: {
            Image: true;
            brand: true;
          };
        };
      };
    };
    similarTo: {
      include: {
        from: true;
      };
    };
  };
}>;

export type IngredientSimilarToWithFrom = Prisma.SimilarIngredientGetPayload<{
  include: {
    from: true;
  };
}>;

export type IngredientProductWithDetails = Prisma.ProductIngredientGetPayload<{
  include: {
    product: {
      include: {
        Image: true;
        brand: true;
      };
    };
  };
}>;

export type ProductWithDetail = Prisma.ProductGetPayload<{
  include: {
    effects: true;
    insideGroups: true;
    brand: true;
    Image: {
      select: {
        url: true;
        altText: true;
      };
    };
    ingredients: {
      include: {
        ingredient: true;
      };
    };
  };
}>;

export type ProductComparison = Prisma.ProductGetPayload<{
  include: {
    effects: true;
    insideGroups: true;
    brand: true;
    Image: {
      select: {
        url: true;
        altText: true;
      };
    };
    ingredients: {
      include: {
        ingredient: true;
      };
    };
  };
}>;

export type ProfileRoutine = Prisma.ProfileGetPayload<{
  include: {
    routines: {
      include: {
        items: {
          include: {
            product: {
              include: {
                brand: true;
                Image: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export type UserPrisma = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    Image: true;

    profile: {
      include: {
        concerns: true;
      };
    };
  };
}>;

export type UserSkinTypeAndConcern = Prisma.UserGetPayload<{
  include: {
    profile: {
      include: {
        concerns: true;
      };
    };
  };
}>;

export type CurrentUserRoutine = Prisma.RoutineGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            Image: true;
          };
        };
        routine: true;
      };
    };
  };
}>;

export type RoutineSubItem = Prisma.RoutineItemGetPayload<{
  include: {
    product: {
      include: {
        Image: true;
      };
    };
    routine: true;
  };
}>;
