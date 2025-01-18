import { Module } from "./core/domain/repository/module.port";
import { StoragePort } from "./core/domain/repository/storage.port";
import { DappController } from "./modules/dapp/application/dapp.controller";
import { DappType } from "./modules/dapp/domain/entities/dapp.type";
import { IDappRepository } from "./modules/dapp/domain/repository/dapp.repository";
import { CreateDappInteractor } from "./modules/dapp/domain/use-cases/interactors/create-dapp.interactor";
import { DeleteDappInteractor } from "./modules/dapp/domain/use-cases/interactors/delete-dapp.interactor"; // Giả sử bạn có DeleteDappInteractor
import { DappRepositoryImpl } from "./modules/dapp/infras/storage/dapp.impl.reposity";
import { StorageController } from "./modules/storage/application/storage.controller";

export class AppModule extends Module {
  constructor() {
    super();
    console.time("Time run application");
    console.log("AppModule dependencies initialized...");
    this.configureDependencies();
    console.timeEnd("Time run application");
  }

  configureDependencies() {
    // Register StorageController
    this.iocContainer.register(
      "StorageController",
      () => new StorageController(),
      true
    );

    // Register DappRepositoryImpl with StorageController as a dependency
    this.iocContainer.register(
      "DappRepositoryImpl",
      () =>
        new DappRepositoryImpl(
          this.iocContainer.resolve<StoragePort>("StorageController")
        )
    );

    // Register CreateDappInteractor
    this.iocContainer.register(
      "createDappInPort",
      () =>
        new CreateDappInteractor(
          this.iocContainer.resolve<IDappRepository>("DappRepositoryImpl")
        )
    );

    // Register DeleteDappInteractor (chỉnh sửa ở đây, không phải CreateDappInteractor)
    this.iocContainer.register(
      "deleteDappInPort",
      () =>
        new DeleteDappInteractor( // Sử dụng DeleteDappInteractor thay vì CreateDappInteractor
          this.iocContainer.resolve<IDappRepository>("DappRepositoryImpl")
        )
    );

    // Register DappController with its dependencies
    this.iocContainer.register(
      "DappController",
      () =>
        new DappController(
          this.iocContainer.resolve<CreateDappInteractor>("createDappInPort"), // Chắc chắn sử dụng đúng Interactor
          this.iocContainer.resolve<DeleteDappInteractor>("deleteDappInPort") // Chắc chắn sử dụng đúng Interactor
        )
    );
  }

  public async init(): Promise<void> {
    try {
      const dappController =
        this.iocContainer.resolve<DappController>("DappController");
      const dapp = await dappController.createDapp({
        name: "Lê Khải Hoàn",
        logo: "",
        type: DappType.FRAME,
        url: "",
      });
      console.log("Application initialized successfully.", dapp);
    } catch (error) {}
  }
}
