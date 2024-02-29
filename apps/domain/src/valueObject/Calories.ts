import { PrimitiveValueObject } from '../seed'

/**
 * カロリー
 */
export class Calories extends PrimitiveValueObject<number> {
  static create(prop: number) {
    this.valid(prop)
    return new Calories(prop)
  }

  get(): number {
    return this._value
  }

  static valid(prop: number) {
    // マイナスは無効
    if (prop < 0) throw new Error(`invalid calories: ${prop}`)
  }
}
