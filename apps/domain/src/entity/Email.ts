import { Entity } from '../seed'
import { NotificationStatus } from '../valueObject/NotificationStatus'
import { EmailTemplate } from './EmailTemplate'
import { MailAddress } from '../valueObject/MailAddress'
import { NotificationId } from '../valueObject/Ulid'

type Props = {
  notificationId: NotificationId
  template: EmailTemplate
  status: NotificationStatus
  email: MailAddress
}

export class Email extends Entity {
  private constructor(private readonly _props: Props) {
    super()
  }

  public static create(props: Props) {
    this.validate(props)
    return new Email(props)
  }

  public static validate(_props: Props) {}

  get template() {
    return this._props.template
  }

  get notificationId() {
    return this._props.notificationId
  }

  get status() {
    return this._props.status
  }

  get email() {
    return this._props.email
  }

  updateStatus(status: NotificationStatus) {
    this._props.status = status
  }
}
