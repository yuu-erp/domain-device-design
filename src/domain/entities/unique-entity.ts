import { generatePrefixId } from "../helpers/ids";
import { IdGenerator } from "../interfaces/id-generator.interface";

export type EntityId = number | string;

export class UniqueEntityID {
  protected readonly id: EntityId;

  constructor(
    private readonly idGenerator?: IdGenerator<EntityId>,
    _id?: EntityId
  ) {
    this.id = _id || this.generateUniqueId();
  }

  private generateUniqueId(): EntityId {
    if (this.idGenerator) {
      return this.idGenerator.generateId();
    }
    return generatePrefixId("entity");
  }

  equals(_id?: UniqueEntityID): boolean {
    if (!_id) {
      return false;
    }
    if (!(_id instanceof this.constructor)) {
      return false;
    }
    return _id.toValue() === this.id;
  }

  toString() {
    return String(this.id);
  }

  toValue(): EntityId {
    return this.id;
  }
}
