import { ulid } from 'ulid'
import { Email } from '../../src/entity/Email'
import { EmailTemplate } from '../../src/entity/EmailTemplate'
import { NotificationId, TemplateId } from '../../src/valueObject/Ulid'
import { ActionDivision } from '../../src/valueObject/ActionDivision'
import { ACTION_DIVISION_KEY, NOTIFICATION_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { NotificationStatus } from '../../src/valueObject/NotificationStatus'
import { MailAddress } from '../../src/valueObject/MailAddress'

describe('Email', () => {
  it('normal cases', () => {
    const notificationId = new NotificationId(ulid())
    const templateId = new TemplateId(ulid())
    const entity = Email.create({
      notificationId: notificationId,
      template: EmailTemplate.create({
        templateId: templateId,
        actionDivision: new ActionDivision(ACTION_DIVISION_KEY.EMAIL_VARIFY),
        content: 'test'
      }),
      status: new NotificationStatus(NOTIFICATION_STATUS_KEY.SUCCEEDED),
      email: new MailAddress('test@example.com')
    })

    expect(entity.notificationId.get()).toBe(notificationId.get())
    expect(entity.template.templateId.get()).toBe(templateId.get())
    expect(entity.template.actionDivision.get()).toBe(ACTION_DIVISION_KEY.EMAIL_VARIFY)
    expect(entity.template.content).toBe('test')
    expect(entity.status.get()).toBe(NOTIFICATION_STATUS_KEY.SUCCEEDED)
    expect(entity.email.get()).toBe('test@example.com')

    // updateStatus
    entity.updateStatus(new NotificationStatus(NOTIFICATION_STATUS_KEY.FAILED))
    expect(entity.status.get()).toBe(NOTIFICATION_STATUS_KEY.FAILED)
  })
})
