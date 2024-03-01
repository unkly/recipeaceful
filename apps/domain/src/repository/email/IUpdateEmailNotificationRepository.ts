import { Email } from 'entity/Email'

export interface IUpdateEmailNotificationRepository {
  // eslint-disable-next-line no-unused-vars
  execute(email: Email): Promise<Email>
}
