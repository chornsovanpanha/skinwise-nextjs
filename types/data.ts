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

export type SkinType = "oily" | "dry" | "combination" | "normal";

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
