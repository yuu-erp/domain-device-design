import { DappController } from "./modules/dapp/application/dapp.controller";
import { DappType } from "./modules/dapp/domain/entities/dapp.type";
import { CreateDappInteractor } from "./modules/dapp/domain/use-cases/interactors/create-dapp.interactor";
import { DeleteDappInteractor } from "./modules/dapp/domain/use-cases/interactors/delete-dapp.interactor";
import { DappRepositoryImpl } from "./modules/dapp/infras/storage/dapp.impl.reposity";

async function bootstrap() {
  const dappRepositoryImpl = new DappRepositoryImpl();

  const createDappInPort = new CreateDappInteractor(dappRepositoryImpl);
  const deleteDappInPort = new DeleteDappInteractor(dappRepositoryImpl);
  const dappController = new DappController(createDappInPort, deleteDappInPort);
  dappController.createDapp({
    name: "Lê Khải Hoàn",
    logo: "",
    url: "",
    type: DappType.FRAME,
  });
}

bootstrap();
