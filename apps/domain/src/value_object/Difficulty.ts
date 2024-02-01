import { PrimitiveValueObject } from '../seed'
import { Difficulty as CDifficulty } from '@recipeaceful/library/dist/const'

/**
 * 難易度
 */
export class Difficulty extends PrimitiveValueObject<number> {
  static create(prop: number) {
    this.valid(prop)
    return new Difficulty(prop)
  }

  get(): number {
    return this._value
  }

  static valid(prop: number) {
    if (!Object.keys(CDifficulty).find((difficulty) => Number(difficulty) === prop))
      throw new Error(`invalid difficulty: ${prop}`)
  }
}
