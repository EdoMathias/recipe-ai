import cors from 'cors';
import express from 'express';
// import expressFileUpload from 'express-fileupload';
// import path from 'path';
// import { fileSaver } from 'uploaded-file-saver';
import { appConfig } from './utils/app-config';
import { errorsMiddleware } from './middleware/errors-middleware';
import { loggerMiddleware } from './middleware/logger-middleware';
import { recipeRouter } from './controllers/recipe-controller';
import { recipeTypeRouter } from './controllers/recipe-type-controller';

// Main application class:
class App {
  // Express server:
  private server = express();

  // Start app:
  public start(): void {
    // Enable CORS requests:
    this.server.use(cors()); // Enable CORS for any frontend website.

    // Create a request.body containing the given json from the front:
    this.server.use(express.json());

    // Create request.files containing uploaded files:
    // this.server.use(expressFileUpload());

    // Configure images folder:
    // fileSaver.config(path.join(__dirname, '1-assets', 'images'));

    // Register middleware:
    this.server.use(loggerMiddleware.logToConsole);

    // Connect any controller route to the server:
    this.server.use('/api', recipeRouter, recipeTypeRouter);

    // Route not found middleware:
    this.server.use(errorsMiddleware.routeNotFound);

    // Catch all middleware:
    this.server.use(errorsMiddleware.catchAll);

    this.server.listen(appConfig.port, () =>
      console.log('Listening on http://localhost:' + appConfig.port),
    );
  }
}

const app = new App();
app.start();
