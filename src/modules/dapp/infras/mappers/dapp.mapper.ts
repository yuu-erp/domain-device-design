import { UniqueEntityID } from "../../../../domain/entities/unique-entity";
import { Mapper } from "../../../../infra-base/mapper.base";
import { DappEntity } from "../../domain/entities/dapp.entity";
import { DappProps, DappType } from "../../domain/entities/dapp.type";

export class DappMapper implements Mapper<DappEntity, DappProps> {
  toPersistence(entity: DappEntity): DappProps {
    const clone = entity.getProps();
    return clone;
  }
  toDomain(record: DappProps): DappEntity {
    return new DappEntity({
      id: new UniqueEntityID(record.id),
      props: {
        id: record.id,
        type: record.type,
        name: record.name,
        logo: record.logo,
        url: record.url,
      },
    });
  }

  toResponse(entity: DappEntity): {
    id: string | number;
    type: DappType;
    name: string;
    logo: string;
    url: string;
  } {
    const props = entity.getProps();
    return {
      id: entity.id.toValue(),
      type: props.type,
      name: props.name,
      logo: props.logo,
      url: props.url,
    };
  }
}
