import { IocContainer } from "../../infra-base/ioc/ioc-container";

export abstract class Module {
  iocContainer: IocContainer;
  constructor() {
    this.iocContainer = new IocContainer();
  }
  abstract configureDependencies(): void;
}
