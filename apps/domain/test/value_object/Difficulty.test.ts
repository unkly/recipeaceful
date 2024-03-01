import { DIFFICULTY_KEY } from '@recipeaceful/library/dist/const'
import { Difficulty } from '../../src/valueObject/Difficulty'

describe('Difficulty', () => {
  it('normal case', () => {
    const difficulty = new Difficulty(DIFFICULTY_KEY.EASY)
    expect(difficulty.get()).toBe(DIFFICULTY_KEY.EASY)
  })
  it('error case', () => {
    expect(() => new Difficulty(0)).toThrow('invalid difficulty: 0')
  })
})
