import { PrimitiveValueObject } from '../seed'

/**
 * ユーザー名
 */
export class UserName extends PrimitiveValueObject<string> {
  static create(prop: string) {
    this.valid(prop)
    return new UserName(prop)
  }

  get(): string {
    return this._value
  }

  static valid(prop: string) {
    // ユーザー名は20文字まで
    if (prop.length > 20) throw new Error(`invalid username: ${prop}`)
  }
}
