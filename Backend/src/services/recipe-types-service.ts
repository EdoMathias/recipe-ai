import { ResourceNotFoundError } from '../models/client-errors';
import { RecipeModel } from '../models/recipe-model';
import { dal } from '../utils/dal';
import { OkPacketParams, ResultSetHeader, RowDataPacket } from 'mysql2';

class RecipeTypesService {
  //----------------------------------------------------------------------------
  public async getAllRecipes(): Promise<string[]> {
    const sqlQuery = 'SELECT * FROM recipe_types';

    const rowDataPacket: RowDataPacket[] =
      await dal.execute<RowDataPacket[]>(sqlQuery);

    // Convert to unknown first to avoid type error
    const recipeTypes: string[] = rowDataPacket as unknown as string[];

    return recipeTypes;
  }

  //----------------------------------------------------------------------------
  public async getRecipeTypeById(id: number): Promise<string> {
    const sqlQuery = `SELECT * FROM recipes WHERE id = ${id}`;

    const rowDataPacket: RowDataPacket[] = await dal.execute(sqlQuery);
    const recipeType: string = rowDataPacket[0] as unknown as string;

    if (!recipeType) {
      throw new ResourceNotFoundError(id);
    }

    return recipeType;
  }

  //----------------------------------------------------------------------------
  public async addRecipeType(recipeType: string): Promise<string> {
    const sqlQuery = 'INSERT INTO recipe_types(type_name) VALUES(?)';

    const values = [recipeType];

    const info: OkPacketParams = await dal.execute<ResultSetHeader>(
      sqlQuery,
      values,
    );

    const addedRecipeType = await this.getRecipeTypeById(info.insertId);

    return addedRecipeType;
  }
}

export const recipeTypesService = new RecipeTypesService();
