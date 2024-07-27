import { NextFunction, Request, Response } from 'express';
import { eStatusCode } from '../enums/status-code';
import { logger } from '../utils/logger';
import { appConfig } from '../utils/app-config';
import { ClientError, RouteNotFoundError } from '../models/client-errors';

class ErrorsMiddleware {
  // Route not found:
  public routeNotFound(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    // Create client error:
    const err = new RouteNotFoundError(request.originalUrl);

    // Go to catch-all:
    next(err);
  }

  // Catch all:
  public catchAll(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    request: Request,
    response: Response,
    // next: NextFunction,
  ): void {
    // Log error to console:
    console.log(err);

    // Log error to file:
    logger.logError(err);

    // Determine error status and message:
    let status: number;
    let message: string;

    if (err instanceof ClientError) {
      // Here TypeScript knows `err` has `status` and `message` properties
      status = err.status;
      message = err.message;
    } else if (err instanceof Error) {
      // Default to InternalServerError for general Errors
      status = eStatusCode.InternalServerError;
      message = appConfig.isProduction
        ? 'Some error, please try again later.'
        : err.message;
    } else {
      // Handle unknown error types
      status = eStatusCode.InternalServerError;
      message = 'An unknown error occurred';
    }

    // Response the error:
    response.status(status).send(message);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
