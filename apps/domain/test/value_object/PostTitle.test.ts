import { PostTitle } from '../../src/valueObject/PostTitle'

describe('PostTitle', () => {
  it('normal case', () => {
    const postTitle = new PostTitle('test')
    expect(postTitle.get()).toBe('test')
  })
  it('error case', () => {
    expect(() => new PostTitle('aa')).toThrow('invalid postTitle: aa')
    expect(() => new PostTitle('a'.repeat(31))).toThrow(`invalid postTitle: ${'a'.repeat(31)}`)
  })
})
