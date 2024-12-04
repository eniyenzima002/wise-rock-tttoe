"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../library/logger"));
const metadata_keys_1 = __importDefault(require("../utils/metadata.keys"));
class ExpressApplication {
    constructor(port, middlewares, controllers) {
        this.port = port;
        this.middlewares = middlewares;
        this.controllers = controllers;
        this.app = (0, express_1.default)();
        this.port = port;
        this.__dirname = path_1.default.resolve();
        this.server = (0, http_1.createServer)(this.app);
        // __INIT__
        this.handleMiddlewares(middlewares);
        this.handleRoutesController(controllers);
        this.handleLogger();
        this.handleDeployment();
    }
    handleMiddlewares(middlewaresArr) {
        middlewaresArr.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    // __INIT-Routes-Config__
    handleRoutesController(controllers) {
        const info = [];
        controllers.forEach((Controller) => {
            const controllerInstance = new Controller();
            const basePath = Reflect.getMetadata(metadata_keys_1.default.BASE_PATH, Controller);
            const routers = Reflect.getMetadata(metadata_keys_1.default.ROUTERS, Controller);
            const expressRouter = express_1.default.Router();
            routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
                if (middlewares) {
                    expressRouter[method](handlerPath, ...middlewares, controllerInstance[String(handlerName)].bind(controllerInstance));
                }
                else {
                    expressRouter[method](handlerPath, controllerInstance[String(handlerName)].bind(controllerInstance));
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
    handleLogger() {
        if (process.env.NODE_ENV === 'development') {
            this.app.use((0, morgan_1.default)('dev'));
        }
    }
    handleDeployment() {
        if (process.env.NODE_ENV !== "development") {
            // this.app.use(express.static(path.join(__dirname, "/frontend/dist")));
            this.app.get("*", (req, res) => {
                res.sendFile(path_1.default.join(process.cwd(), "frontend", "dist", "index.html"));
            });
        }
    }
    startServer() {
        return this.server.listen(this.port, () => {
            logger_1.default.info(`Application is running on port: ${this.port}`);
        });
    }
}
exports.default = ExpressApplication;
