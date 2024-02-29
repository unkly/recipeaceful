import { Entity } from '../seed'
import { ActionDivision } from 'valueObject/ActionDivision'
import { NotificationStatus } from 'valueObject/NotificationStatus'
import { Ulid } from 'valueObject/Ulid'

type Props = {
  notificationId: Ulid
  actionDivision: ActionDivision
  content: string
  status: NotificationStatus
}

export class Sms extends Entity {
  private constructor(private readonly _props: Props) {
    super()
  }

  public static create(props: Props) {
    this.validate(props)
    return new Sms(props)
  }

  public static validate(props: Props) {}

  get notificationId() {
    return this._props.notificationId
  }

  get actionDivision() {
    return this._props.actionDivision
  }

  get content() {
    return this._props.content
  }

  get status() {
    return this._props.status
  }
}
