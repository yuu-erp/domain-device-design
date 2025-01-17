import { UseCase } from "../../../../../core/domain/use-cases.port.base";
import { DappEntity } from "../../entities/dapp.entity";
import { CreateDappProps } from "../../entities/dapp.type";

export interface CreateDappCommand extends CreateDappProps {}

export abstract class CreateDappInPort
  implements UseCase<CreateDappCommand, DappEntity>
{
  abstract execute(createUserCommand: CreateDappCommand): Promise<DappEntity>;
}
