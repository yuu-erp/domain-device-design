import { UseCase } from "../../../../../core/domain/use-cases.port.base";
import { DappEntity } from "../../entities/dapp.entity";

export interface DeleteDappCommand extends DappEntity {}

export abstract class DeleteUserInPort
  implements UseCase<DeleteDappCommand, boolean>
{
  abstract execute(deleteUserCommand: DeleteDappCommand): Promise<boolean>;
}
