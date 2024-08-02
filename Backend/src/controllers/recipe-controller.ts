import express, { NextFunction, Request, Response } from 'express';
import { recipeService } from '../services/recipe-service';
import { ValidationError } from '../models/client-errors';
import { RecipeModel } from '../models/recipe-model';
import { eStatusCode } from '../enums/status-code';

class RecipeController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  //----------------------------------------------------------------------------
  private registerRoutes(): void {
    this.router.get('/recipes', this.getAllRecipes);
    this.router.get('/recipes/:recipeId', this.getRecipeById);
    this.router.post('/recipes', this.addRecipe);
  }

  //----------------------------------------------------------------------------
  private async getAllRecipes(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const recipes = await recipeService.getAllRecipes();
      response.json(recipes);
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new ValidationError('An unknown error occurred'));
      }
    }
  }

  //----------------------------------------------------------------------------
  private async getRecipeById(): Promise<void> {}

  //----------------------------------------------------------------------------
  private async addRecipe(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const recipe = new RecipeModel(request.body);
      const newRecipe = await recipeService.addRecipe(recipe);

      response.status(eStatusCode.Created).json(newRecipe);
    } catch (error: unknown) {
      next(error);
    }
  }
}

const recipeController = new RecipeController();
export const recipeRouter = recipeController.router;
