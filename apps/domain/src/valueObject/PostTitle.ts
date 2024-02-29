import { PrimitiveValueObject } from '../seed'

/**
 * タイトル
 */
export class PostTitle extends PrimitiveValueObject<string> {
  public constructor(value: string) {
    super(value)
    this.valid(value)
    return new PostTitle(value)
  }

  get(): string {
    return this._value
  }

  protected valid(value: string) {
    // 3文字以上30文字以下
    if (value.length < 3 || value.length > 30) throw new Error(`invalid postTitle: ${value}`)
  }
}
