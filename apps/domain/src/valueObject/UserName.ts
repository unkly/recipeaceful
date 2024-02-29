import { PrimitiveValueObject } from '../seed'

/**
 * ユーザー名
 */
export class UserName extends PrimitiveValueObject<string> {
  public constructor(value: string) {
    super(value)
    this.valid(value)
    return new UserName(value)
  }

  get(): string {
    return this._value
  }

  protected valid(value: string) {
    // ユーザー名は20文字まで
    if (value.length > 20) throw new Error(`invalid username: ${value}`)
  }
}
