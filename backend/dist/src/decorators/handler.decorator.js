"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Post = exports.Put = exports.Get = void 0;
const metadata_keys_1 = __importDefault(require("../utils/metadata.keys"));
const methods_keys_1 = __importDefault(require("../utils/methods.keys"));
const decoratorFactory = (method) => (path, middlewares) => (target, propertyKey) => {
    const controllerClass = target.constructor;
    const routers = Reflect.hasMetadata(metadata_keys_1.default.ROUTERS, controllerClass)
        ? Reflect.getMetadata(metadata_keys_1.default.ROUTERS, controllerClass)
        : [];
    routers.push({
        method,
        middlewares,
        handlerPath: path,
        handlerName: propertyKey,
    });
    Reflect.defineMetadata(metadata_keys_1.default.ROUTERS, routers, controllerClass);
};
exports.Get = decoratorFactory(methods_keys_1.default.GET);
exports.Put = decoratorFactory(methods_keys_1.default.PUT);
exports.Post = decoratorFactory(methods_keys_1.default.POST);
exports.Delete = decoratorFactory(methods_keys_1.default.DELETE);
