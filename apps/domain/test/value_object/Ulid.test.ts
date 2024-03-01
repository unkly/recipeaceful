import { ulid } from 'ulid'
import { Ulid } from '../../src/valueObject/Ulid'

describe('Ulid', () => {
  it('normal case', () => {
    const id = ulid()
    const entity = new Ulid(id)
    expect(entity.get()).toBe(id)
  })
  it('error case', () => {
    expect(() => new Ulid('a')).toThrow('invalid ulid: a')
  })
})
