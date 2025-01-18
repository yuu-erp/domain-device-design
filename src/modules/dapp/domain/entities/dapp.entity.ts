import { AggregateRoot } from "../../../../core/domain/entities/aggregate.base";
import { UniqueEntityID } from "../../../../core/domain/entities/unique-entity";
import { SnowflakeID } from "../../../../core/infra-base/generateId/SnowflakeID";
import { type DappDomain } from "./dapp.type";

export class DappEntity extends AggregateRoot<DappDomain> {
  static create(createProps: DappDomain) {
    const snowflakeID = new SnowflakeID();
    const id = new UniqueEntityID(snowflakeID as any);
    const props: DappDomain = { ...createProps };
    const user = new DappEntity({ id, props });
    return user;
  }
  validate(): void {}
}
