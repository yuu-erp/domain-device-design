import { DappEntity } from "../../domain/entities/dapp.entity";
import { CreateDappProps } from "../../domain/entities/dapp.type";
import { CreateDappInPort } from "../../domain/use-cases/port/create-dapp.in-port";

export class DappController {
  constructor(private readonly createDappInPort: CreateDappInPort) {}

  async createDapp(payload: CreateDappProps): Promise<DappEntity | undefined> {
    try {
      const dapp = await this.createDappInPort.execute(payload);
      console.log("Dapp created successfully:", dapp);
      return dapp; // Trả về đối tượng dapp khi thành công
    } catch (error) {
      console.error("Error creating Dapp:", (error as Error).message);
      return undefined; // Trả về undefined khi có lỗi
    }
  }
}
