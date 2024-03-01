import { ProcessDetail } from '../../src/valueObject/ProcessDetail'

describe('ProcessDetail', () => {
  it('normal case', () => {
    const processDetail = new ProcessDetail('test')
    expect(processDetail.get()).toBe('test')
  })
  it('error case', () => {
    expect(() => new ProcessDetail('a'.repeat(101))).toThrow(`invalid processDetail: ${'a'.repeat(101)}`)
  })
})
