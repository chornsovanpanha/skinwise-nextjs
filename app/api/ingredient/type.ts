import { EffectType } from "@prisma/client";

export interface IngredientProductInput {
  productId: number;
  concentration?: string;
  notes?: string;
  isKey?: boolean;
}

// For IngredientInsideGroup
export interface IngredientInsideGroupInput {
  title: string;
}

// For IngredientEffect
export interface IngredientEffectInput {
  type: EffectType;
  title: string;
  shortDesc?: string;
  desc?: string;
}

// For SimilarIngredient relation
export interface IngredientSimilarInput {
  toId?: number; // for similarFrom
  fromId?: number; // for similarTo
}

// POST/PUT payload
export interface IngredientPayload {
  name: string;
  alias: string;
  desc?: string;
  about?: string;

  products?: IngredientProductInput[];
  insideGroups?: IngredientInsideGroupInput[];
  effects?: IngredientEffectInput[];
  similarFrom?: IngredientSimilarInput[];
  similarTo?: IngredientSimilarInput[];
}
