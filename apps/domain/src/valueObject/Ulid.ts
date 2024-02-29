import { Regex } from '@recipeaceful/library/dist/const/Regex'
import { PrimitiveValueObject } from '../seed'

export class Ulid extends PrimitiveValueObject<string> {
  public constructor(value: string) {
    super(value)
    this.valid(value)
    return new Ulid(value)
  }

  get(): string {
    return this._value
  }

  protected valid(value: string) {
    if (!value.match(Regex.ULID)) throw new Error(`invalid ulid: ${value}`)
  }
}
