import { DappEntity } from "../../entities/dapp.entity";

export interface DeleteDappOutPort {
  delete(dapp: DappEntity): Promise<boolean>;
}
