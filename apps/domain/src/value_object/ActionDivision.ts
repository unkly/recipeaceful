import { ACTION_DIVISION } from '@recipeaceful/library/dist/const/index'
import { PrimitiveValueObject } from '../seed'

/**
 * 通知区分
 */
export class ActionDivision extends PrimitiveValueObject<number> {
  static create(prop: number) {
    this.valid(prop)
    return new ActionDivision(prop)
  }

  get(): number {
    return this._value
  }

  static valid(prop: number) {
    if (!Object.keys(ACTION_DIVISION).includes(String(prop))) throw new Error(`invalid actionDivision: ${prop}`)
  }
}
