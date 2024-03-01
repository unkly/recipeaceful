import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { UserStatus } from '../../src/valueObject/UserStatus'

describe('UserStatus', () => {
  it('normal case', () => {
    const userStatus = new UserStatus(USER_STATUS_KEY.ACTIVE)
    expect(userStatus.get()).toBe(USER_STATUS_KEY.ACTIVE)
  })
  it('error case', () => {
    expect(() => new UserStatus(-1)).toThrow(`invalid userStatus: -1`)
  })
})
