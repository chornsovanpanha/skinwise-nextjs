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
};

export type Ingredient = {
  id: number;
  name: string;
};

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
