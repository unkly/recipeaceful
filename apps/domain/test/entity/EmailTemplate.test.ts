import { ACTION_DIVISION_KEY } from '@recipeaceful/library/dist/const'
import { EmailTemplate } from '../../src/entity/EmailTemplate'
import { ulid } from 'ulid'
import { ActionDivision } from '../../src/valueObject/ActionDivision'
import { Ulid } from '../../src/valueObject/Ulid'

describe('EmailTemplate', () => {
  it('normal cases', () => {
    const id = new Ulid(ulid())

    const entity = EmailTemplate.create({
      templateId: id,
      actionDivision: new ActionDivision(ACTION_DIVISION_KEY.EMAIL_VARIFY),
      content: 'test'
    })

    expect(entity.actionDivision.get()).toBe(ACTION_DIVISION_KEY.EMAIL_VARIFY)
    expect(entity.content).toBe('test')
    expect(entity.templateId.get()).toBe(id.get())
  })
})
