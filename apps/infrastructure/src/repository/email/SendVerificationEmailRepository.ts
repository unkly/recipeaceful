import { Email } from '@recipeaceful/domain/dist/entity/Email'
import { ISendVerificationEmailRepository } from '@recipeaceful/domain/dist/repository/email/ISendVerificationEmailRepository'
import { SESUtil } from '@recipeaceful/library/dist/utils/ses'

export class SendVerificationEmailRepository implements ISendVerificationEmailRepository {
  constructor(private readonly _sesUtil: SESUtil) {}

  async execute(email: Email): Promise<void> {
    await this._sesUtil.sendEmail({
      content: email.template.content,
      toAddresses: email.email.get()
    })
  }
}
