import { DappType, IDappCreatedDE } from "../entities/dapp.type";
import { DomainEvent, IDomainEvent } from "./domain-event.base";

export class DappCreatedDomainEvent
  extends DomainEvent
  implements IDappCreatedDE
{
  name: string;
  logo: string;
  url: string;
  type: DappType;

  constructor(props: IDomainEvent<DappCreatedDomainEvent>) {
    super(props);
    this.name = props.name;
    this.logo = props.logo;
    this.url = props.url;
    this.type = props.type;
  }
}
