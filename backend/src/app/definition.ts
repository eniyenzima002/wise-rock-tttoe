import express, { Application, Handler } from 'express';
import { createServer } from 'http';
import morgan from 'morgan';

import logger from '../library/logger';
import MetadataKeys from '../utils/metadata.keys';
import IRouter from '../utils/router.interface.handler';

class ExpressApplication {
  get(arg0: string, arg1: (req: any, res: any) => void) {
    throw new Error('Method not implemented.');
  }
  private app: Application;
  private server;

  constructor(
    private port: string | number,
    private middlewares: any[],
    private controllers: any[]
  ) {
    this.app = express();
    this.port = port;
    this.server = createServer(this.app);

    // __INIT__
    this.handleMiddlewares(middlewares);
    this.handleRoutesController(controllers);
    this.handleLogger();
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

  startServer() {
    return this.server.listen(this.port, () => {
      logger.info(`Application is running on port: ${this.port}`);
    });
  }
}

export default ExpressApplication;
