import { SnowflakeID } from "src/core/infra-base/generateId/snowflake-id";
import { DappDomain } from "./dapp.type";
import { UniqueEntityID } from "./unique-entity";
import { AggregateRoot } from "./aggregate.base";
import { LoggerPort } from "src/core/infra-base/logger/logger.port";
import { Emitter } from "src/core/infra-base/emitter/emitter";
import { DappCreatedDomainEvent } from "../events/dapp-create.event";

export class DappEntity extends AggregateRoot<DappDomain> {
  static create(createProps: DappDomain, logger: LoggerPort, emitter: Emitter) {
    const snowflakeID = new SnowflakeID();
    const id = new UniqueEntityID(createProps.id.toString(), snowflakeID);
    const props: DappDomain = { ...createProps };
    const dapp = new DappEntity({ id, props });

    // Đảm bảo rằng metadata có đầy đủ thông tin
    const metadata = {
      timestamp: Date.now(),
      correlationId: undefined, // Bạn có thể thêm correlationId nếu cần
      causationId: undefined, // Bạn có thể thêm causationId nếu cần
      userId: undefined, // Nếu có userId thì thêm vào đây
    };

    // Tạo và thêm sự kiện DappCreatedDomainEvent
    const event = new DappCreatedDomainEvent({
      aggregateId: id, // Đảm bảo rằng aggregateId được truyền vào
      ...props, // Bao gồm các thuộc tính của DappDomain
      _metadata: metadata, // Đảm bảo rằng metadata được truyền vào
    });

    dapp.addEvent(event); // Thêm sự kiện vào danh sách sự kiện của AggregateRoot

    // Phát hành sự kiện
    dapp.publishEvents(logger, emitter);

    return dapp;
  }
  validate(): void {}
}
