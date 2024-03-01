import { PostDetail } from '../../src/valueObject/PostDetail'

describe('PostDetail', () => {
  it('normal case', () => {
    const postDetail = new PostDetail('test')
    expect(postDetail.get()).toBe('test')
  })
  it('error case', () => {
    expect(() => new PostDetail('a'.repeat(501))).toThrow(`invalid postDetail: ${'a'.repeat(501)}`)
  })
})
