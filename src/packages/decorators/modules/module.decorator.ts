import { ModuleMetadata } from "../interfaces";
import { validateModuleKeys } from "../utils";

export function Module(metadata: ModuleMetadata): ClassDecorator {
  const propsKeys = Object.keys(metadata);
  validateModuleKeys(propsKeys);

  return (target: Function) => {
    for (const property in metadata) {
      if (Object.hasOwnProperty.call(metadata, property)) {
        Reflect.defineMetadata(`module:metadata`, metadata, target);
      }
    }
  };
}
