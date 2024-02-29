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

  protected constructor(value: T) {
    this._value = value
  }

  abstract get(): T
}
