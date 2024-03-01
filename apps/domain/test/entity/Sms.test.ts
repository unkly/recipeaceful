import { ACTION_DIVISION_KEY, NOTIFICATION_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { Sms } from '../../src/entity/Sms'
import { ulid } from 'ulid'
import { ActionDivision } from '../../src/valueObject/ActionDivision'
import { NotificationStatus } from '../../src/valueObject/NotificationStatus'
import { Ulid } from '../../src/valueObject/Ulid'

describe('Sms', () => {
  it('normal cases', () => {
    const id = new Ulid(ulid())
    const entity = Sms.create({
      notificationId: id,
      actionDivision: new ActionDivision(ACTION_DIVISION_KEY.EMAIL_VARIFY),
      content: 'test',
      status: new NotificationStatus(NOTIFICATION_STATUS_KEY.SUCCEEDED)
    })

    expect(entity.notificationId.get()).toBe(id.get())
    expect(entity.actionDivision.get()).toBe(ACTION_DIVISION_KEY.EMAIL_VARIFY)
    expect(entity.content).toBe('test')
    expect(entity.status.get()).toBe(NOTIFICATION_STATUS_KEY.SUCCEEDED)
  })
})
