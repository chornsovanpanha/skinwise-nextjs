import { Ingredient } from "@prisma/client";
import { ProductWithBrandAndImages, RoutineType } from "./prisma";
export interface QuizOption {
  id: number;
  text: string;
  skinType: SkinType;
  emoji: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface UserAnswerQuiz {
  answer: string;
}

export type Product = {
  id: number;
  name: string;
  brandName: string;
  imageUrl: string;
  alias: string;
};

export type Brand = {
  id: number;
  alias: string;
  title: string;
  country?: string;
};

// export type Ingredient = {
//   id: number;
//   name: string;
// };

// Skin
export enum SkinType {
  OILY = "OILY",
  DRY = "DRY",
  COMBINATION = "COMBINATION",
  NORMAL = "NORMAL",
  SENSITIVE = "SENSITIVE",
}

export interface QuizOption {
  id: number;
  text: string;
  skinType: SkinType;
  emoji: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface UserAnswerQuiz {
  answer: string;
}

export type SearchType = "product" | "ingredient";

export type AnalyseData = {
  score: string;
  shortDesc: string;
  scoreDesc: string;
};

export interface ProductIngredientResponse {
  products: ProductWithBrandAndImages[];
  ingredients: Ingredient[];
}

export type RoutineItem = {
  id: number;
  routineId: number;
  type: RoutineType;
  productId: number;
  usage: string;
  product: {
    id: number;
    name: string;
    code: string | null;
    alias: string | null;
    desc: string | null;
    rating: number;
    brandId: number;
    searchCount: number | null;
    brand: {
      id: number;
      alias: string;
      title: string;
      country: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
    Image: {
      id: number;
      createdAt: Date;
      productId: number | null;
      ingredientId: number | null;
      url: string;
      altText: string | null;
      width: number | null;
      height: number | null;
      userId: number | null;
    }[];
  };
};

export type ProfileWithConcerns = {
  id: number;
  userId: number;
  skinType: SkinType;
  allergies: string[]; // or another type if you store allergy objects
  createdAt: Date;
  updatedAt: Date;
  concerns: {
    id: number;
    name: string;
  }[];
};

export type SelectProduct = {
  product?: ProductWithBrandAndImages;
  type?: RoutineType | null;
  usage?: string;
  routineId?: string;
  itemId?: string;
};
