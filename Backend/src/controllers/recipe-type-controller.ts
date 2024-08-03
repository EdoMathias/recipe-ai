import express, { NextFunction, Request, Response } from 'express';
import { eStatusCode } from '../enums/status-code';
import { ValidationError } from '../models/client-errors';
import { recipeTypesService } from '../services/recipe-types-service';
import { RecipeType } from '../models/recipe-types';

class RecipeTypeController {
  // Create a router object for listening to HTTP requests:
  public readonly router = express.Router();

  // Register routes once:
  public constructor() {
    this.registerRoutes();
  }

  //----------------------------------------------------------------------------
  private registerRoutes(): void {
    this.router.get('/recipe-types', this.getAllRecipeTypes);
    this.router.get('/recipe-types/:recipeTypeId', this.getRecipeTypeById);
    this.router.post('/recipe-types', this.addRecipeType);
    this.router.delete('/recipe-types/:recipeTypeId', this.deleteRecipeType);
  }

  //----------------------------------------------------------------------------
  private async getAllRecipeTypes(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const recipeTypes = await recipeTypesService.getAllRecipeTypes();
      response.json(recipeTypes);
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new ValidationError('An unknown error occurred'));
      }
    }
  }

  //----------------------------------------------------------------------------
  private async getRecipeTypeById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = +request.params.recipeTypeId;
      const recipeType = await recipeTypesService.getRecipeTypeById(id);
      response.json(recipeType);
    } catch (error: unknown) {
      next(error);
    }
  }

  //----------------------------------------------------------------------------
  private async addRecipeType(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const recipeType: RecipeType = request.body;
      const newRecipeTypes = await recipeTypesService.addRecipeType(
        recipeType.type_name,
      );

      response.status(eStatusCode.Created).json(newRecipeTypes);
    } catch (error: unknown) {
      next(error);
    }
  }

  //----------------------------------------------------------------------------
  private async deleteRecipeType(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = +request.params.recipeTypeId;
      const recipeType = await recipeTypesService.getRecipeTypeById(id);
      response.sendStatus(eStatusCode.NoContent);
    } catch (error: unknown) {
      next(error);
    }
  }
}

const recipeTypeController = new RecipeTypeController();
export const recipeTypeRouter = recipeTypeController.router;
