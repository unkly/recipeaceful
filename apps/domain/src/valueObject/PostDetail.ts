import { PrimitiveValueObject } from '../seed'

/**
 * 説明
 */
export class PostDetail extends PrimitiveValueObject<string> {
  public constructor(value: string) {
    super(value)
    this.valid(value)
  }

  get(): string {
    return this._value
  }

  protected valid(value: string) {
    // 500文字以内
    if (value.length >= 500) throw new Error(`invalid postDetail: ${value}`)
  }
}
