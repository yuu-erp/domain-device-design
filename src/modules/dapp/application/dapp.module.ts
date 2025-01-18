import { DappEntity } from "../domain/entities/dapp.entity";
import { CreateDappProps } from "../domain/entities/dapp.type";
import { DappRepository } from "../domain/repository/dapp.repository";
import { CreateDappInteractor } from "../domain/use-cases/interactors/create-dapp.interactor";
import { DeleteDappInteractor } from "../domain/use-cases/interactors/delete-dapp.interactor";
import { DappController } from "./dapp.controller";

export class DappModule {
  private dappController: DappController;
  constructor(private readonly dappRepository: DappRepository) {
    const createDappUseCase = new CreateDappInteractor(this.dappRepository);
    const deleteDappUseCase = new DeleteDappInteractor(this.dappRepository);
    this.dappController = new DappController(
      createDappUseCase,
      deleteDappUseCase
    );
  }

  async createDapp(payload: CreateDappProps): Promise<DappEntity | undefined> {
    return await this.dappController.createDapp(payload);
  }

  async deleteDapp(payload: DappEntity): Promise<boolean> {
    return this.dappController.deleteDapp(payload);
  }
}
