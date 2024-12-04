import MetadataKeys from "../utils/metadata.keys";

const Router =
    (basePath: string): ClassDecorator =>
    (target) =>
        Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    
export default Router;