import { Abstract } from "./abstract.interface";
import { DynamicModule } from "./dynamic-module.interface";
import { ForwardReference } from "./forward-reference.interface";
import { Provider } from "./provider.interface";
import { Type } from "./type.interface";

export interface ModuleMetadata {
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  controllers?: Type<any>[];
  providers?: Provider[];
  exports?: Array<
    | DynamicModule
    | string
    | symbol
    | Provider
    | ForwardReference
    | Abstract<any>
    | Function
  >;
}
