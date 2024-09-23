export type RecipeCardInfo = {
  id: number;
  name: string;
  time: string;
  foodType: string;
  difficulty: string;
};

export type RecipeInstructions = Array<{ id: string; text: string }>;

export type RecipeIngredients = Array<{
  id: string;
  text: string;
  quantity: number;
  units: string;
}>;

export type RecipeExtendedInfo = RecipeCardInfo & {
  ingredients: RecipeIngredients;
  instructions: RecipeInstructions;
};
