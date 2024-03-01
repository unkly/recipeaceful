import { Email } from 'entity/Email'

export interface IRegisterEmailNotificationRepository {
  // eslint-disable-next-line no-unused-vars
  execute(email: Email): Promise<void>
}
