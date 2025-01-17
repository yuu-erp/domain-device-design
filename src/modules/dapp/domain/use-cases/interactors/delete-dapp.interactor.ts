import {
  DeleteDappCommand,
  DeleteUserInPort,
} from "../port/delete-dapp.in-port";
import { DeleteDappOutPort } from "../port/delete-dapp.out-port";

export class DeleteDappInteractor implements DeleteUserInPort {
  constructor(private readonly deleteDappOutPort: DeleteDappOutPort) {}

  execute(deleteUserCommand: DeleteDappCommand): Promise<boolean> {
    return this.deleteDappOutPort.delete(deleteUserCommand);
  }
}
