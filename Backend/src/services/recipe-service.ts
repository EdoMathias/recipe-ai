import { ResourceNotFoundError } from '../models/client-errors';
import { RecipeModel } from '../models/recipe-model';
import { dal } from '../utils/dal';
import { OkPacketParams, ResultSetHeader, RowDataPacket } from 'mysql2';

class RecipeService {
  //----------------------------------------------------------------------------
  public async getAllRecipes(): Promise<RecipeModel[]> {
    const sqlQuery = 'SELECT * FROM recipes';

    // const recipes = await dal.execute(sqlQuery);

    const rowDataPacket: RowDataPacket[] =
      await dal.execute<RowDataPacket[]>(sqlQuery);
    const recipes: RecipeModel[] = rowDataPacket as RecipeModel[];

    return recipes;
  }

  //----------------------------------------------------------------------------
  public async getRecipeById(id: number): Promise<RecipeModel> {
    const sqlQuery = `SELECT * FROM recipes WHERE id = ${id}`;

    // const recipes = await dal.execute(sqlQuery);
    // const recipe = recipes[0];

    // if (!recipe) {
    //   throw new ResourceNotFoundError(id);
    // }

    const rowDataPacket: RowDataPacket[] = await dal.execute(sqlQuery);
    const recipe: RecipeModel = rowDataPacket[0] as RecipeModel;

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

    const values = [recipe.recipeName, JSON.stringify(recipe.recipeSteps)];

    const info: OkPacketParams = await dal.execute<ResultSetHeader>(
      sqlQuery,
      values,
    );

    const addedRecipe = await this.getRecipeById(info.insertId);

    return addedRecipe;
  }
}

export const recipeService = new RecipeService();
