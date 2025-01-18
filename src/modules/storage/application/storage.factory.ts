import { StoragePort } from "../../../core/domain/repository/storage.port";

export class StorageFactory {
  static createStorage(storageType: string): StoragePort {}
}
