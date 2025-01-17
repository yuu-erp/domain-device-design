import { DappEntity } from "../../entities/dapp.entity";
import {
  CreateDappCommand,
  CreateDappInPort,
} from "../port/create-dapp.in-port";
import { CreateDappOutPort } from "../port/create-dapp.out-port";

export class CreateDappInteractor implements CreateDappInPort {
  constructor(private readonly createDappPort: CreateDappOutPort) {}

  execute(command: CreateDappCommand): Promise<DappEntity> {
    const user = DappEntity.create(command);
    return this.createDappPort.save(user);
  }
}
