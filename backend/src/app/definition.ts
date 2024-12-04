import express, { Application, Handler } from 'express';
import path from "path";
import { createServer } from 'http';
import morgan from 'morgan';

import logger from '../library/logger';
import MetadataKeys from '../utils/metadata.keys';
import IRouter from '../utils/router.interface.handler';

class ExpressApplication {

  private app: Application;
  private __dirname;
  private server;

  constructor(
    private port: string | number,
    private middlewares: any[],
    private controllers: any[]
  ) {
    this.app = express();
    this.port = port;
    this.__dirname = path.resolve();
    this.server = createServer(this.app);

    // __INIT__
    this.handleMiddlewares(middlewares);
    this.handleRoutesController(controllers);
    this.handleLogger();
    this.handleDeployment();
    
  }

  private handleMiddlewares(middlewaresArr: any[]) {
    middlewaresArr.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  // __INIT-Routes-Config__
  private handleRoutesController(controllers: any[]) {
    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((Controller) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new Controller();

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        Controller
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        Controller
      );

      const expressRouter = express.Router();

      routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
        if (middlewares) {
          expressRouter[method](
            handlerPath,
            ...middlewares,
            controllerInstance[String(handlerName)].bind(controllerInstance)
          );
        } else {
          expressRouter[method](
            handlerPath,
            controllerInstance[String(handlerName)].bind(controllerInstance)
          );
        }

        info.push({
          api: `${method.toLocaleLowerCase()} ${basePath + handlerPath}`,
          handler: `${Controller.name}.${String(handlerName)}`,
        });
      });

      this.app.use(basePath, expressRouter);
    });

    console.table(info);
  }

  private handleLogger() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private handleDeployment() {
    if (process.env.NODE_ENV !== "development") {
      this.app.use(express.static(path.join(__dirname, "/frontend/dist")));
      this.app.get("*", (req, res) => {
        res.sendFile(path.join(process.cwd(), "frontend", "dist", "index.html"));
      });
    }
  }

  startServer() {
    return this.server.listen(this.port, () => {
      logger.info(`Application is running on port: ${this.port}`);
    });
  }
}

export default ExpressApplication;
