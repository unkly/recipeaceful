import { Regex } from '@recipeaceful/library/dist/const/Regex'
import { PrimitiveValueObject } from '../seed'

/**
 * メールアドレス
 */
export class MailAddress extends PrimitiveValueObject<string> {
  public constructor(value: string) {
    super(value)
    this.valid(value)
  }

  get(): string {
    return this._value
  }

  protected valid(value: string) {
    if (!value.match(Regex.MAIL_ADDRESS)) throw new Error(`invalid mailAddress: ${value}`)
  }
}
