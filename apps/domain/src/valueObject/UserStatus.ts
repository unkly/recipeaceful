import { USER_STATUS } from '@recipeaceful/library/dist/const'
import { PrimitiveValueObject } from '../seed'

/**
 * ユーザー認証ステータス
 */
export class UserStatus extends PrimitiveValueObject<number> {
  public constructor(value: number) {
    super(value)
    this.valid(value)
  }

  get(): number {
    return this._value
  }

  protected valid(value: number) {
    if (!Object.keys(USER_STATUS).includes(String(value))) throw new Error(`invalid userStatus: ${value}`)
  }
}
