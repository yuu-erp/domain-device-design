import { StoragePort } from "../../../core/domain/repository/storage.port";

export class StorageController implements StoragePort {
  private storage: Map<string, any> = new Map(); // Dùng any thay cho T để linh hoạt hơn trong việc lưu trữ nhiều loại dữ liệu

  async setItem<T>(key: string, value: T): Promise<void> {
    this.storage.set(key, value);
  }

  async getItem<T>(key: string): Promise<T | null> {
    const item = this.storage.get(key);
    return item !== undefined ? (item as T) : null;
  }

  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }
}
