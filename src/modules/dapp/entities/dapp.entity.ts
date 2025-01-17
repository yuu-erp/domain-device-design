import { AggregateRoot } from "../../../domain/entities/aggregate.base";
import { UniqueEntityID } from "../../../domain/entities/unique-entity";
import { type DappProps } from "./dapp.type";

export class DappEntity extends AggregateRoot<DappProps> {
  static create(createProps: DappProps) {
    const id = new UniqueEntityID();
    const props: DappProps = { ...createProps };
    const user = new DappEntity({ id, props });

    console.log("Create dapp id:", id.toValue());
    console.log("Create dapp props:", createProps);
    console.log("Create dapp user:", user);
    return user;
  }
  validate(): void {
    console.log("validate props", this.getProps());
    console.log("Dapp is valid:", this);
  }
}
