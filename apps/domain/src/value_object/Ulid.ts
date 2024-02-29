import { Regex } from '@recipeaceful/library/dist/const/Regex'
import { PrimitiveValueObject } from '../seed'

export class Ulid extends PrimitiveValueObject<string> {
  public static create(prop: string) {
    this.valid(prop)
    return new Ulid(prop)
  }

  get(): string {
    return this._value
  }

  public static valid(prop: string) {
    if (!prop.match(Regex.ULID)) throw new Error(`invalid ulid: ${prop}`)
  }
}
