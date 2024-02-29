import { PrimitiveValueObject } from '../seed'
import { DIFFICULTY } from '@recipeaceful/library/dist/const'

/**
 * 難易度
 */
export class Difficulty extends PrimitiveValueObject<number> {
  public constructor(value: number) {
    super(value)
    this.valid(value)
    return new Difficulty(value)
  }

  get(): number {
    return this._value
  }

  protected valid(value: number) {
    if (!Object.keys(DIFFICULTY).find((difficulty) => Number(difficulty) === value))
      throw new Error(`invalid difficulty: ${value}`)
  }
}
