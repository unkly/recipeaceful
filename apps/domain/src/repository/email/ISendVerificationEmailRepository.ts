import { Email } from 'entity/Email'

export interface ISendVerificationEmailRepository {
  // eslint-disable-next-line no-unused-vars
  execute(email: Email): Promise<void>
}
