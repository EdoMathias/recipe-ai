import { NextFunction, Request, Response } from 'express';
import { eStatusCode } from '../enums/status-code';
import { logger } from '../utils/logger';
import { appConfig } from '../utils/app-config';
import { RouteNotFoundError } from '../models/client-errors';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): void {
    // Log error to console:
    console.log(err);

    // Log error to file:
    logger.logError(err);

    // Take error status:
    const status = err.status || eStatusCode.InternalServerError;

    // Take error message:
    const message =
      status === eStatusCode.InternalServerError && appConfig.isProduction
        ? 'Some error, please try again later.'
        : err.message;

    // Response the error:
    response.status(status).send(message);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
