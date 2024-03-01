import { PrimitiveValueObject } from '../seed'

/**
 * 材料
 */
export class Material extends PrimitiveValueObject<string> {
  public constructor(value: string) {
    super(value)
    this.valid(value)
  }

  get(): string {
    return this._value
  }

  protected valid(value: string) {
    // 30文字まで
    if (value.length > 30) throw new Error(`invalid material: ${value}`)
  }
}
