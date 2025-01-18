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

  // @ts-ignore
  async findByKey(
    key: keyof DappEntity,
    value: any
  ): Promise<DappEntity | null> {
    for (const dapp of this.storage.values()) {
      if (dapp[key] === value) {
        return dapp;
      }
    }
    return null;
  }

  async findAll(): Promise<DappEntity[]> {
    return Array.from(this.storage.values());
  }

  async existsById(id: string): Promise<boolean> {
    return this.storage.has(id);
  }

  async delete(entity: DappEntity): Promise<boolean> {
    return this.deleteById(entity.id.toString());
  }

  async deleteById(id: string): Promise<boolean> {
    if (this.storage.has(id)) {
      this.storage.delete(id);
      return true;
    }
    return false;
  }
}
