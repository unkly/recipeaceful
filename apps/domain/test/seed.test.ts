import { Entity } from '../src/seed'

describe('seed', () => {
  describe('Entity', () => {
    it('normal case', () => {
      const entity = new Entity()
      expect(entity.ulid).toBe(entity.ulid)
    })
  })
})
