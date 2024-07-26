import { ResourceNotFoundError } from '../models/client-errors';
import { RecipeModel } from '../models/recipe-model';
import { dal } from '../utils/dal';
import { OkPacketParams } from 'mysql2';

class RecipeService {
  //----------------------------------------------------------------------------
  public async getAllRecipes(): Promise<RecipeModel[]> {
    const sqlQuery = 'SELECT * FROM recipes';

    const recipes = await dal.execute(sqlQuery);

    return recipes;
  }

  //----------------------------------------------------------------------------
  public async getRecipeById(id: number): Promise<RecipeModel> {
    const sqlQuery = `SELECT * FROM recipes WHERE id = ${id}`;

    const recipes = await dal.execute(sqlQuery);
    const recipe = recipes[0];

    if (!recipe) {
      throw new ResourceNotFoundError(id);
    }

    return recipe;
  }

  //----------------------------------------------------------------------------
  public async addRecipe(recipe: RecipeModel): Promise<RecipeModel> {
    recipe.validateInsert();

    const sqlQuery =
      'INSERT INTO recipes(recipe_name, recipe_steps) VALUES(?,?)';

    const values = [recipe.recipeName, recipe.recipeSteps];

    const info: OkPacketParams = await dal.execute(sqlQuery, values);

    const addedRecipe = await this.getRecipeById(info.insertId);

    return addedRecipe;
  }
}

export const recipeService = new RecipeService();
