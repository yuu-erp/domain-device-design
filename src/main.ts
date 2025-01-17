import { DappEntity } from "./modules/dapp/entities/dapp.entity";

async function bootstrap() {
  DappEntity.create();
}
bootstrap();
