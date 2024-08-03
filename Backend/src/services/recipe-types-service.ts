import { ResourceNotFoundError } from '../models/client-errors';
import { RecipeType } from '../models/recipe-types';
import { dal } from '../utils/dal';
import { OkPacketParams, ResultSetHeader, RowDataPacket } from 'mysql2';

class RecipeTypesService {
  //----------------------------------------------------------------------------
  public async getAllRecipeTypes(): Promise<RecipeType[]> {
    const sqlQuery = 'SELECT * FROM recipe_types';

    const rowDataPacket: RowDataPacket[] =
      await dal.execute<RowDataPacket[]>(sqlQuery);

    // Convert to unknown first to avoid type error
    const recipeTypes: RecipeType[] = rowDataPacket as RecipeType[];

    return recipeTypes;
  }

  //----------------------------------------------------------------------------
  public async getRecipeTypeById(id: number): Promise<RecipeType> {
    console.log('id:', id);
    const sqlQuery = `SELECT * FROM recipe_types WHERE id = ${id}`;

    const rowDataPacket: RowDataPacket[] = await dal.execute(sqlQuery);
    const recipeType: RecipeType = rowDataPacket[0] as RecipeType;

    if (!recipeType) {
      throw new ResourceNotFoundError(id);
    }

    return recipeType;
  }

  //----------------------------------------------------------------------------
  public async addRecipeType(recipeType: string): Promise<RecipeType> {
    const sqlQuery = 'INSERT INTO recipe_types(type_name) VALUES(?)';

    const values = [recipeType];

    const info: OkPacketParams = await dal.execute<ResultSetHeader>(
      sqlQuery,
      values,
    );

    const addedRecipeType = await this.getRecipeTypeById(info.insertId);

    return addedRecipeType;
  }

  //----------------------------------------------------------------------------
  public async deleteRecipeType(id: number): Promise<void> {
    const sqlQuery = 'DELETE FROM recipe_types WHERE id = ?';

    const values = [id];

    const info: OkPacketParams = await dal.execute<ResultSetHeader>(
      sqlQuery,
      values,
    );

    if (info.affectedRows === 0) {
      throw new ResourceNotFoundError(id);
    }

    return;
  }
}

export const recipeTypesService = new RecipeTypesService();
