import { DappType } from "./modules/dapp/domain/entities/dapp.type";
import { DappMapper } from "./modules/dapp/infras/mappers/dapp.mapper";

async function bootstrap() {
  const data = {
    id: 1,
    name: "adasdas",
    type: DappType.FRAME,
    url: "",
    logo: "",
  };
  const userMapper = new DappMapper();
  const userEntityDomain = userMapper.toDomain(data);
  const userEntityResponse = userMapper.toResponse(userEntityDomain);

  console.log("userEntityDomain: ", userEntityDomain);
  console.log("userEntityResponse: ", userEntityResponse);
}
bootstrap();
