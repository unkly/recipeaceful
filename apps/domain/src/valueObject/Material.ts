import { PrimitiveValueObject } from '../seed'

/**
 * 材料
 */
export class Material extends PrimitiveValueObject<string> {
  static create(prop: string) {
    this.valid(prop)
    return new Material(prop)
  }

  get(): string {
    return this._value
  }

  static valid(prop: string) {
    // 30文字まで
    if (prop.length > 30) throw new Error(`invalid material: ${prop}`)
  }
}
