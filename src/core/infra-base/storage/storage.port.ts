export interface StoragePort<T extends Record<string, any> = any> {
  set<K extends keyof T>(key: K, value: T[K]): void;
  setAll(data: T): void;
  get<K extends keyof T>(key: K): T[K] | null;
  remove<K extends keyof T>(key: K): void;
  clear(): void;
  getAll(): T;
}
