import { DappEntity } from "../entities/dapp.entity";
import { DappRepository } from "./dapp.repository";

export class InMemoryDappRepository implements DappRepository {
  private storage: Map<string, DappEntity> = new Map();

  async save(dapp: DappEntity): Promise<DappEntity> {
    this.storage.set(dapp.id.toString(), dapp);
    console.log("Dapp saved:", dapp);
    return dapp;
  }

  async findById(id: string): Promise<DappEntity> {
    const dapp = this.storage.get(id);
    if (!dapp) {
      throw new Error(`Dapp with id ${id} not found`);
    }
    return dapp;
  }
  findByKey(): Promise<DappEntity | null> {
    throw new Error("");
  }
  findAll(): Promise<DappEntity[]> {
    throw new Error("");
  }
  existsById(): Promise<boolean> {
    throw new Error("");
  }

  delete(): Promise<boolean> {
    throw new Error("");
  }
  deleteById(): Promise<boolean> {
    throw new Error("");
  }
}
