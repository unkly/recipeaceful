import { MailAddress } from '../../src/valueObject/MailAddress'

describe('MailAddress', () => {
  it('normal case', () => {
    const mailAddress = new MailAddress('test@example.com')
    expect(mailAddress.get()).toBe('test@example.com')
  })
  it('error case', () => {
    expect(() => new MailAddress('test')).toThrow('invalid mailAddress: test')
  })
})
