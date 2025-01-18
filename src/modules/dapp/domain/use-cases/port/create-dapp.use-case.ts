import { DappEntity } from "../../entities/dapp.entity";
import { CreateDappCommand, CreateDappInPort } from "./create-dapp.in-port";
import { CreateDappOutPort } from "./create-dapp.out-port";
import { UniqueEntityID } from "../../../../../domain/entities/unique-entity";

export class CreateDappUseCase implements CreateDappInPort {
  constructor(private readonly outPort: CreateDappOutPort) {}

  async execute(command: CreateDappCommand): Promise<DappEntity> {
    const { type, name, logo, url } = command;

    // 1. Validate input
    if (!type || !name || !url) {
      throw new Error("Missing required fields for creating Dapp");
    }

    // 2. Create new Dapp entity
    const dapp = new DappEntity({
      id: new UniqueEntityID(),
      props: { type, name, logo, url },
    });

    // 3. Validate the Dapp entity (business rules)
    dapp.validate();

    // 4. Save the Dapp entity using outPort
    return await this.outPort.save(dapp);
  }
}
