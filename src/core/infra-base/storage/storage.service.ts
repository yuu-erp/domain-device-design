import { StoragePort } from "./storage.port";

export class StorageService<T extends Record<string, any> = any>
  implements StoragePort<T>
{
  private storage: Map<keyof T, T[keyof T]> = new Map();

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.storage.set(key, value);
  }

  setAll(data: T): void {
    Object.entries(data).forEach(([key, value]) => {
      this.storage.set(key as keyof T, value);
    });
  }

  get<K extends keyof T>(key: K): T[K] | null {
    return this.storage.get(key) || null;
  }

  remove<K extends keyof T>(key: K): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  getAll(): T {
    const result = {} as T;
    this.storage.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}
