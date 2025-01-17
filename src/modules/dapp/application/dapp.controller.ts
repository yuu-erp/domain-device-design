import { DappEntity } from "../domain/entities/dapp.entity";
import { CreateDappProps } from "../domain/entities/dapp.type";
import { CreateDappInPort } from "../domain/use-cases/port/create-dapp.in-port";
import { DeleteUserInPort } from "../domain/use-cases/port/delete-dapp.in-port";

export class DappController {
  constructor(
    private readonly createDappInPort: CreateDappInPort,
    private readonly deleteDappInPort: DeleteUserInPort
  ) {}

  async createDapp(payload: CreateDappProps): Promise<DappEntity | undefined> {
    return await this.createDappInPort.execute(payload);
  }

  async deleteDapp(payload: DappEntity): Promise<boolean> {
    return this.deleteDappInPort.execute(payload);
  }
}
