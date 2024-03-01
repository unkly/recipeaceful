import { ulid } from 'ulid'

/**
 * Entityの基底クラス
 */
export class Entity {
  private readonly _ulid: string

  constructor() {
    this._ulid = ulid()
  }

  public get ulid() {
    return this._ulid
  }
}

/**
 * ValueObjectの基底クラス
 */
export abstract class PrimitiveValueObject<T> {
  protected readonly _value: T

  public constructor(value: T) {
    this.valid(value)
    this._value = value
  }

  abstract get(): T

  // eslint-disable-next-line no-unused-vars
  protected abstract valid(value: T): void
}
