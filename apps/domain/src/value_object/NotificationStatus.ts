import { NOTIFICATION_STATUS } from '@recipeaceful/library/dist/const'
import { PrimitiveValueObject } from '../seed'

/**
 * 通知ステータス
 */
export class NotificationStatus extends PrimitiveValueObject<number> {
  static create(prop: number) {
    this.valid(prop)
    return new NotificationStatus(prop)
  }

  get(): number {
    return this._value
  }

  static valid(prop: number) {
    if (!Object.keys(NOTIFICATION_STATUS).includes(String(prop))) throw new Error(`invalid notificationStatus: ${prop}`)
  }
}
