import { eStatusCode } from '../enums/status-code';

// Base class for any client error:
export abstract class ClientError {
  public message: string;
  public status: number;

  public constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}

// Route not found error:
export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(`Route ${route} not found.`, eStatusCode.NotFound);
  }
}

// Resource not found error:
export class ResourceNotFoundError extends ClientError {
  public constructor(id: number) {
    super(`id ${id} not exist.`, eStatusCode.NotFound);
  }
}

// Validation error:
export class ValidationError extends ClientError {
  public constructor(message: string) {
    super(message, eStatusCode.BadRequest);
  }
}

// Unauthorized error:
export class UnauthorizedError extends ClientError {
  public constructor(message: string) {
    super(message, eStatusCode.Unauthorized);
  }
}
