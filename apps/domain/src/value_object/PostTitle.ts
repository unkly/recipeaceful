import { PrimitiveValueObject } from '../seed'

/**
 * タイトル
 */
export class PostTitle extends PrimitiveValueObject<string> {
  static create(prop: string) {
    this.valid(prop)
    return new PostTitle(prop)
  }

  get(): string {
    return this._value
  }

  static valid(prop: string) {
    // 3文字以上30文字以下
    if (prop.length < 3 || prop.length > 30) throw new Error(`invalid postTitle: ${prop}`)
  }
}
