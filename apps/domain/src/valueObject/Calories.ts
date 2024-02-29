import { PrimitiveValueObject } from '../seed'

/**
 * カロリー
 */
export class Calories extends PrimitiveValueObject<number> {
  public constructor(value: number) {
    super(value)
    this.valid(value)
    return new Calories(value)
  }

  get(): number {
    return this._value
  }

  protected valid(value: number) {
    // マイナスは無効
    if (value < 0) throw new Error(`invalid calories: ${value}`)
  }
}
