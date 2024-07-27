import Joi from 'joi';
import { ValidationError } from './client-errors';
import { RecipeSteps } from './recipe-steps-model';

export class RecipeModel {
  public id: number;
  public recipeName: string;
  public recipeType: string[];
  public recipeSteps: RecipeSteps;

  constructor(recipe: RecipeModel) {
    this.id = recipe.id;
    this.recipeName = recipe.recipeName;
    this.recipeType = recipe.recipeType;
    this.recipeSteps = recipe.recipeSteps;
  }

  //----------------------------------------------------------------------------
  // validation schemas
  private static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    recipeName: Joi.string().required().min(2).max(50),
    recipeType: Joi.array().items(Joi.string().min(1)).required().min(1),
    recipeSteps: Joi.object().pattern(Joi.string().min(1), Joi.string().min(1)),
  });

  //----------------------------------------------------------------------------
  // Validation functions
  public validateInsert(): void {
    const result = RecipeModel.insertValidationSchema.validate(this);
    if (result.error) {
      throw new ValidationError(result.error.message);
    }
  }
}
