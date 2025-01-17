export abstract class DomainEvent {
  abstract get eventName(): string;
  abstract get payload(): any;
}
