import mysql2, {
  Pool,
  PoolOptions,
  QueryError,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';
import { appConfig } from './app-config';

// Type for SQL query values
type SQLValue =
  | string
  | number
  | boolean
  | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Record<string, any>
  | SQLValue[];

type QueryResult =
  | RowDataPacket[]
  | RowDataPacket[][]
  | ResultSetHeader
  | ResultSetHeader[];

// DAL = Data Access Layer - The only one accessing the database.
class DAL {
  // Database configuration:
  private options: PoolOptions = {
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDatabase,
  };

  // Creating a connection. If the connection is closed, the pool will create another one:
  private readonly connection: Pool = mysql2.createPool(this.options);

  // Execute sql:
  public execute<T extends QueryResult>(
    sql: string,
    values?: SQLValue[],
  ): Promise<T> {
    // To Promisify
    return new Promise<T>((resolve, reject) => {
      this.connection.query(sql, values, (err: QueryError, result: T) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

export const dal = new DAL();
