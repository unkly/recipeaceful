import { PrimitiveValueObject } from '../seed'

/**
 * 説明
 */
export class PostDetail extends PrimitiveValueObject<string> {
  static create(prop: string) {
    this.valid(prop)
    return new PostDetail(prop)
  }
  get(): string {
    return this._value
  }

  static valid(prop: string) {
    // 500文字以内
    if (prop.length >= 500) throw new Error(`invalid postDetail: ${prop}`)
  }
}
