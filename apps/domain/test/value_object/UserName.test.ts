import { UserName } from '../../src/valueObject/UserName'

describe('UserName', () => {
  it('normal case', () => {
    const userName = new UserName('test')
    expect(userName.get()).toBe('test')
  })
  it('error case', () => {
    expect(() => new UserName('a'.repeat(21))).toThrow(`invalid username: ${'a'.repeat(21)}`)
  })
})
