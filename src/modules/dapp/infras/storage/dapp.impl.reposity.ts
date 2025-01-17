import { StoragePort } from "../../../../core/domain/repository/storage.port";
import { DappEntity } from "../../domain/entities/dapp.entity";
import { IDappRepository } from "../../domain/repository/dapp.repository";

export class DappRepositoryImpl implements IDappRepository {
  constructor(private readonly storage: StoragePort) {}

  findById(_id: string): Promise<DappEntity | null> {
    throw new Error("findById Not implemented");
  }
  findByKey(_key: keyof DappEntity): Promise<DappEntity | null> {
    throw new Error("findByKey Not implemented");
  }
  findAll(): Promise<DappEntity[]> {
    throw new Error("findAll Not implemented");
  }
  existsById(_id: string): Promise<boolean> {
    throw new Error("existsById Not implemented");
  }

  save(_entity: DappEntity): Promise<DappEntity> {
    throw new Error("save Not implemented");
  }

  delete(_entity: DappEntity): Promise<boolean> {
    throw new Error("delete Not implemented");
  }
  deleteById(_id: string): Promise<boolean> {
    throw new Error("deleteById Not implemented");
  }
}
