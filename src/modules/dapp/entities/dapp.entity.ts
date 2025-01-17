import { AggregateRoot } from "../../../domain/entities/aggregate.base";
import { UniqueEntityID } from "../../../domain/entities/unique-entity";
import { type DappProps } from "./dapp.type";

export class DappEntity extends AggregateRoot<DappProps> {
  static create() {
    const id = new UniqueEntityID();
    console.log("Create dapp id:", id.toValue());
  }
  validate(): void {
    throw new Error("Method not implemented.");
  }
}
