import { InjectionToken } from "./injection-token.interface";
import { OptionalFactoryDependency } from "./optional-factory-dependency.interface";
import { Scope } from "./scope-options.interface";
import { Type } from "./type.interface";

export type Provider<T = any> =
  | Type<any>
  | ClassProvider<T>
  | ValueProvider<T>
  | FactoryProvider<T>
  | ExistingProvider<T>;

export interface ClassProvider<T = any> {
  provide: InjectionToken;
  useClass: Type<T>;
  scope?: Scope;
  inject?: never;
  durable?: boolean;
}

export interface ValueProvider<T = any> {
  provide: InjectionToken;
  useValue: T;
  inject?: never;
}

export interface FactoryProvider<T = any> {
  provide: InjectionToken;
  useFactory: (...args: any[]) => T | Promise<T>;
  inject?: Array<InjectionToken | OptionalFactoryDependency>;
  scope?: Scope;
  durable?: boolean;
}
// @ts-ignore
export interface ExistingProvider<T = any> {
  provide: InjectionToken;
  useExisting: any;
}
