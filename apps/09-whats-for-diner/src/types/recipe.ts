export interface IngredientList {
  proteins: string[];
  carbs: string[];
  vegetables: string[];
  other: string[];
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: IngredientList;
  instructions: string[];
} 