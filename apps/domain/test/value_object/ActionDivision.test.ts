import { ACTION_DIVISION_KEY } from '@recipeaceful/library/dist/const'
import { ActionDivision } from '../../src/valueObject/ActionDivision'

describe('ActionDivision', () => {
  it('normal case', () => {
    const actionDivision = new ActionDivision(ACTION_DIVISION_KEY.EMAIL_VARIFY)
    expect(actionDivision.get()).toBe(ACTION_DIVISION_KEY.EMAIL_VARIFY)
  })
  it('error case', () => {
    expect(() => new ActionDivision(0)).toThrow('invalid actionDivision: 0')
  })
})
