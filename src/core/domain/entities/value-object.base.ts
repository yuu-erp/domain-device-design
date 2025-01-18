import { ArgumentNotProvidedException } from "../../exceptions/exceptions";
import { isEmpty, invariant } from "../../helpers/utils";

/**
 * Domain Primitive is an object that contains only a single value
 */
export type Primitives = string | number | boolean;
export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}

type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<Props> {
  protected readonly props: ValueObjectProps<Props>;

  constructor(props: ValueObjectProps<Props>) {
    this.#validateProps(props);
    this.validate(props);
    this.props = props;
  }

  protected abstract validate(props: ValueObjectProps<Props>): void;

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  equals(vo?: ValueObject<Props>) {
    if (!vo) return false;
    return JSON.stringify(this) === JSON.stringify(vo);
  }

  /**
   * Convert value obj to get raw properties
   */
  raw() {
    if (this.#isDomainPrimitive(this.props)) {
      return this.props.value;
    }
    const clone = this.convertPropsToObject(this.props);
    return Object.freeze(clone);
  }

  #validateProps(props: ValueObjectProps<Props>) {
    invariant(
      !(
        isEmpty(props) ||
        (this.#isDomainPrimitive(props) && isEmpty(props.value))
      ),
      new ArgumentNotProvidedException("Property cannot be empty")
    );
  }

  #isDomainPrimitive(
    obj: unknown
  ): obj is DomainPrimitive<Props & (Primitives | Date)> {
    return Object.prototype.hasOwnProperty.call(obj, "value");
  }

  private convertPropsToObject(props: any): Record<string, any> {
    if (props && typeof props === "object") {
      return { ...props }; // This creates a shallow copy of the props
    }
    return {}; // Return empty object if not an object
  }
}
