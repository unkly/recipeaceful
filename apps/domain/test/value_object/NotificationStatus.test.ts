import { NOTIFICATION_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { NotificationStatus } from '../../src/valueObject/NotificationStatus'

describe('NotificationStatus', () => {
  it('normal case', () => {
    const notificationStatus = new NotificationStatus(NOTIFICATION_STATUS_KEY.SUCCEEDED)
    expect(notificationStatus.get()).toBe(NOTIFICATION_STATUS_KEY.SUCCEEDED)
  })
  it('error case', () => {
    expect(() => new NotificationStatus(-1)).toThrow('invalid notificationStatus: -1')
  })
})
