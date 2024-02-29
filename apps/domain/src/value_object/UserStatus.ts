import { USER_STATUS } from '@recipeaceful/library/dist/const'
import { PrimitiveValueObject } from '../seed'

/**
 * ユーザー認証ステータス
 */
export class UserStatus extends PrimitiveValueObject<number> {
  static create(prop: number) {
    this.valid(prop)
    return new UserStatus(prop)
  }

  get(): number {
    return this._value
  }

  static valid(prop: number) {
    if (!Object.keys(USER_STATUS).includes(String(prop))) throw new Error(`invalid userStatus ${prop}`)
  }
}
