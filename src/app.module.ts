import { Module } from "./core/infra-base/ioc/module";
import { StoragePort } from "./core/infra-base/storage/storage.port";
import { StorageService } from "./core/infra-base/storage/storage.service";
import { CalculateLayoutModule } from "./modules/calculate-layout/application/calculate-layout.module";

export class AppModule extends Module {
  private storageService!: StoragePort; // Đánh dấu là không phải null hoặc undefined

  constructor() {
    super();
    console.time("Time run application");
    console.log("AppModule dependencies initialized...");
    this.configureDependencies();
    console.timeEnd("Time run application");
  }

  configureDependencies() {
    const { iocContainer } = this;
    iocContainer.register("StorageService", () => new StorageService(), true);
    this.storageService = iocContainer.resolve<StoragePort>("StorageService");
    iocContainer.register(
      "CalculateLayoutModule",
      () => new CalculateLayoutModule(this.storageService)
    );
  }

  public async init(): Promise<void> {
    try {
      const { iocContainer } = this;
      const calculateLayoutModule = iocContainer.resolve<CalculateLayoutModule>(
        "CalculateLayoutModule"
      );
      calculateLayoutModule.init();
      console.log("Application initialized successfully.");
    } catch (error) {
      console.log(error);
    }
  }
}
