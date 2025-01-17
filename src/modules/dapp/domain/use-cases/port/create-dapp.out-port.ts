import { DappEntity } from "../../entities/dapp.entity";

export interface CreateDappOutPort {
  save(dapp: DappEntity): Promise<DappEntity>;
}
