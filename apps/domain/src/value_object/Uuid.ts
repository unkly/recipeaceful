import { Regex } from '@recipeaceful/library/dist/Regex'
import { PrimitiveValueObject } from '../seed'

export class Uuid extends PrimitiveValueObject<string> {
  static create(prop: string) {
    this.valid(prop)
    return new Uuid(prop)
  }

  get(): string {
    return this._value
  }

  static valid(prop: string) {
    if (!prop.match(Regex.UUID_V4)) throw new Error(`invalid uuid: ${prop}`)
  }
}
