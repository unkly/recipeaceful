import { Uuid } from './value_object/Uuid'
import { v4 } from 'uuid'

/**
 * Entityの基底クラス
 */
export class Entity {
  private readonly _uuid: Uuid

  constructor() {
    this._uuid = Uuid.create(v4())
  }

  public get uuid() {
    return this._uuid
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
