import Methods from "./methods.keys";

interface IRouter {
    method: Methods;
    middlewares?: any[];
    handlerPath: string;
    handlerName: string | symbol;
}

export default IRouter;