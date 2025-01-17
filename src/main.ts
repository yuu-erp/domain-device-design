import { DappEntity } from "./modules/dapp/entities/dapp.entity";
import { DappType } from "./modules/dapp/entities/dapp.type";

async function bootstrap() {
  DappEntity.create({
    name: "adasdas",
    type: DappType.FRAME,
    url: "",
    logo: "",
  });
}
bootstrap();
