import { Calories } from '../../src/valueObject/Calories'

describe('Calories', () => {
  it('normal case', () => {
    const calories = new Calories(100)
    expect(calories.get()).toBe(100)
  })
  it('error case', () => {
    expect(() => new Calories(-1)).toThrow('invalid calories: -1')
  })
})
