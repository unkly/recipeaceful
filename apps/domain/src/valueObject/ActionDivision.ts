import { ACTION_DIVISION } from '@recipeaceful/library/dist/const/index'
import { PrimitiveValueObject } from '../seed'

/**
 * 通知区分
 */
export class ActionDivision extends PrimitiveValueObject<number> {
  public constructor(value: number) {
    super(value)
    this.valid(value)
  }

  get(): number {
    return this._value
  }

  protected valid(value: number) {
    if (!Object.keys(ACTION_DIVISION).includes(String(value))) throw new Error(`invalid actionDivision: ${value}`)
  }
}
