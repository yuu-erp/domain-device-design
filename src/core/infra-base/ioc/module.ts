import { IocContainer } from "./ioc-container";

export abstract class Module {
  iocContainer: IocContainer;
  constructor() {
    this.iocContainer = new IocContainer();
  }
  abstract configureDependencies(): void;
}
