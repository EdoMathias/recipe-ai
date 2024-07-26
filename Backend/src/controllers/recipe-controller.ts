import express, { NextFunction, Request, Response } from 'express';
import { recipeService } from '../services/recipe-service';

class RecipeController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  //----------------------------------------------------------------------------
  private registerRoutes(): void {
    this.router.get('/get-all-recipes', this.getAllRecipes);
    this.router.get('/get-recipe/:recipeId', this.getRecipeById);
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
    } catch (err: unknown) {
      next(err);
    }
  }

  //----------------------------------------------------------------------------
  private async getRecipeById(): Promise<void> {}

  //----------------------------------------------------------------------------
  private async addRecipe(): Promise<void> {}
}

const recipeController = new RecipeController();
export const recipeRouter = recipeController.router;
