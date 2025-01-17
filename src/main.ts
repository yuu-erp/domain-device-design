import { DappController } from "./modules/dapp/application/controller/dapp.controller";
import { DappType } from "./modules/dapp/domain/entities/dapp.type";
import { InMemoryDappRepository } from "./modules/dapp/domain/repo/InMemoryDappRepository";
import { CreateDappInteractor } from "./modules/dapp/domain/use-cases/interactors/create-dapp.interactor";

async function bootstrap() {
  const data = {
    id: 1, // Normally the ID is generated in the Use Case, don't hardcode.
    name: "My Dapp",
    type: DappType.FRAME,
    url: "http://example.com",
    logo: "http://example.com/logo.png",
  };

  // Khởi tạo repository
  const dappRepository = new InMemoryDappRepository();

  // Khởi tạo use case với repository
  const createDappUseCase = new CreateDappInteractor(dappRepository);

  // Khởi tạo controller và gọi phương thức tạo Dapp
  const dappController = new DappController(createDappUseCase);
  const dapp = await dappController.createDapp(data);

  if (dapp) {
    console.log("Dapp created successfully:", dapp.id.toValue());

    // Tìm Dapp theo ID và log kết quả
    const foundDapp = await dappRepository.findById(
      dapp.id.toValue() as string
    );
    if (foundDapp) {
      console.log("Found Dapp:", foundDapp);
    } else {
      console.log("Dapp not found");
    }
  } else {
    console.log("Error creating Dapp.");
  }
}

bootstrap();
