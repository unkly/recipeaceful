import { Material } from '../../src/valueObject/Material'

describe('Material', () => {
  it('normal case', () => {
    const material = new Material('test')
    expect(material.get()).toBe('test')
  })
  it('error case', () => {
    expect(() => new Material('a'.repeat(31))).toThrow(`invalid material: ${'a'.repeat(31)}`)
  })
})
