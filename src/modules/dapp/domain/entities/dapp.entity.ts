import { AggregateRoot } from "../../../../core/domain/entities/aggregate.base";
import { UniqueEntityID } from "../../../../core/domain/entities/unique-entity";
import { type DappDomain } from "./dapp.type";

export class DappEntity extends AggregateRoot<DappDomain> {
  static create(createProps: DappDomain) {
    const id = new UniqueEntityID();
    const props: DappDomain = { ...createProps };
    const user = new DappEntity({ id, props });
    return user;
  }
  validate(): void {}
}
