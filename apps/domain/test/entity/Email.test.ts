import { ulid } from 'ulid'
import { Email } from '../../src/entity/Email'
import { EmailTemplate } from '../../src/entity/EmailTemplate'
import { Ulid } from '../../src/valueObject/Ulid'
import { ActionDivision } from '../../src/valueObject/ActionDivision'
import { ACTION_DIVISION_KEY, NOTIFICATION_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { NotificationStatus } from '../../src/valueObject/NotificationStatus'
import { MailAddress } from '../../src/valueObject/MailAddress'

describe('Email', () => {
  it('正常系', () => {
    const id = Ulid.create(ulid())
    const entity = Email.create({
      notificationId: id,
      template: EmailTemplate.create({
        templateId: id,
        actionDivision: ActionDivision.create(ACTION_DIVISION_KEY.EMAIL_VARIFY),
        content: 'test'
      }),
      status: NotificationStatus.create(NOTIFICATION_STATUS_KEY.SUCCEEDED),
      email: MailAddress.create('test@example.com')
    })

    expect(entity.notificationId.get()).toBe(id.get())
    expect(entity.template.templateId.get()).toBe(id.get())
    expect(entity.template.actionDivision.get()).toBe(ACTION_DIVISION_KEY.EMAIL_VARIFY)
    expect(entity.template.content).toBe('test')
    expect(entity.status.get()).toBe(NOTIFICATION_STATUS_KEY.SUCCEEDED)
    expect(entity.email.get()).toBe('test@example.com')

    // updateStatus
    entity.updateStatus(NotificationStatus.create(NOTIFICATION_STATUS_KEY.FAILED))
    expect(entity.status.get()).toBe(NOTIFICATION_STATUS_KEY.FAILED)
  })
})
