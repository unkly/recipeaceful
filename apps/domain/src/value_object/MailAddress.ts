import { Regex } from '@recipeaceful/library/dist/const/Regex'
import { PrimitiveValueObject } from '../seed'

/**
 * メールアドレス
 */
export class MailAddress extends PrimitiveValueObject<string> {
  static create(prop: string) {
    this.valid(prop)
    return new MailAddress(prop)
  }

  get(): string {
    return this._value
  }

  static valid(prop: string) {
    if (!prop.match(Regex.MAIL_ADDRESS)) throw new Error(`invalid mailAddress: ${prop}`)
  }
}
