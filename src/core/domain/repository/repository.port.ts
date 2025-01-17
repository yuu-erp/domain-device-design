export type StringEnum<T extends string> = T;

export interface RepositoryPort<Entity> {
  findById(id: string): Promise<Entity | null>;
  findByKey(key: keyof Entity): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  existsById(id: string): Promise<boolean>;

  save(entity: Entity): Promise<Entity>;

  delete(entity: Entity): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
}
