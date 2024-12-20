import MetadataKeys from "../utils/metadata.keys";
import Methods from "../utils/methods.keys";
import IRouter from "../utils/router.interface.handler";

const decoratorFactory =
    (method: Methods) =>
        (path: string, middlewares?: any[]): MethodDecorator =>
            (target, propertyKey) => {
                const controllerClass = target.constructor;

                const routers: IRouter[] = Reflect.hasMetadata(
                    MetadataKeys.ROUTERS,
                    controllerClass,
                )
                    ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
                    : [];
        
                routers.push({
                    method,
                    middlewares,
                    handlerPath: path,
                    handlerName: propertyKey,
                });
                Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
            };

export const Get = decoratorFactory(Methods.GET);
export const Put = decoratorFactory(Methods.PUT);
export const Post = decoratorFactory(Methods.POST);
export const Delete = decoratorFactory(Methods.DELETE);
