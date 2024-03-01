import { NOTIFICATION_STATUS } from '@recipeaceful/library/dist/const'
import { PrimitiveValueObject } from '../seed'

/**
 * 通知ステータス
 */
export class NotificationStatus extends PrimitiveValueObject<number> {
  public constructor(value: number) {
    super(value)
    this.valid(value)
  }

  get(): number {
    return this._value
  }

  protected valid(value: number) {
    if (!Object.keys(NOTIFICATION_STATUS).includes(String(value)))
      throw new Error(`invalid notificationStatus: ${value}`)
  }
}
