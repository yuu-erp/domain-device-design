import { UniqueEntityID } from "../../../../core/domain/entities/unique-entity";
import { Mapper } from "../../../../core/infra-base/mapper.base";
import { DappEntity } from "../../domain/entities/dapp.entity";
import { DappDomain, DappResponse } from "../../domain/entities/dapp.type";

export class DappMapper
  implements Mapper<DappEntity, DappDomain, DappResponse>
{
  toPersistence(entity: DappEntity): DappDomain {
    const clone = entity.getProps();
    return clone;
  }
  toDomain(record: DappDomain): DappEntity {
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

  toResponse(entity: DappEntity): DappResponse {
    const props = entity.getProps();
    return {
      id: Number(entity.id.toValue()), // Ép kiểu thành number.
      type: props.type,
      name: props.name,
      logo: props.logo,
      url: props.url,
    };
  }
}
