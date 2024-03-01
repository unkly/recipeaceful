import { User } from '@recipeaceful/domain/dist/entity/User'
import { IRegisterUserRepository } from '@recipeaceful/domain/dist/repository/user/IRegisterUserRepository'
import { IEmailQueryService } from '@recipeaceful/domain/dist/queryService/IEmailQueryService'
import { ACTION_DIVISION_KEY, NOTIFICATION_STATUS_KEY } from '@recipeaceful/library/dist/const/index'
import { ActionDivision } from '@recipeaceful/domain/dist/valueObject/ActionDivision'
import { IRegisterEmailNotificationRepository } from '@recipeaceful/domain/dist/repository/email/IRegisterEmailNotificationRepository'
import { Email } from '@recipeaceful/domain/dist/entity/Email'
import { EmailTemplate } from '@recipeaceful/domain/dist/entity/EmailTemplate'
import { NotificationStatus } from '@recipeaceful/domain/dist/valueObject/NotificationStatus'
import { MailAddress } from '@recipeaceful/domain/dist/valueObject/MailAddress'
import { ISendVerificationEmailRepository } from '@recipeaceful/domain/dist/repository/email/ISendVerificationEmailRepository'
import { IUpdateEmailNotificationRepository } from '@recipeaceful/domain/dist/repository/email/IUpdateEmailNotificationRepository'
import { NotificationId, TemplateId } from '@recipeaceful/domain/dist/valueObject/Ulid'
import { ulid } from 'ulid'

export class RegisterUserUseCase {
  constructor(
    private readonly _registerUserRepository: IRegisterUserRepository,
    private readonly _emailQueryService: IEmailQueryService,
    private readonly _registerEmailNotificationRepository: IRegisterEmailNotificationRepository,
    private readonly _sendVerificationEmailRepository: ISendVerificationEmailRepository,
    private readonly _updateEmailNotificationRepository: IUpdateEmailNotificationRepository
  ) {}

  async register(user: User): Promise<boolean> {
    // DB登録
    await this._registerUserRepository.execute(user)

    // メール通知履歴登録
    const content = await this._emailQueryService.findContentFromActionDivision(
      new ActionDivision(ACTION_DIVISION_KEY.EMAIL_VARIFY)
    )

    const email = Email.create({
      notificationId: new NotificationId(ulid()),
      template: EmailTemplate.create({
        templateId: new TemplateId(ulid()),
        actionDivision: new ActionDivision(ACTION_DIVISION_KEY.EMAIL_VARIFY),
        content
      }),
      status: new NotificationStatus(NOTIFICATION_STATUS_KEY.PENDING),
      email: new MailAddress(user.email.get())
    })

    await this._registerEmailNotificationRepository.execute(email)

    // メール送信
    try {
      await this._sendVerificationEmailRepository.execute(email)

      // 成功ステータスに変更し更新
      email.updateStatus(new NotificationStatus(NOTIFICATION_STATUS_KEY.SUCCEEDED))
      await this._updateEmailNotificationRepository.execute(email)
    } catch (error) {
      // 失敗ステータスに変更し更新
      email.updateStatus(new NotificationStatus(NOTIFICATION_STATUS_KEY.FAILED))
      await this._updateEmailNotificationRepository.execute(email)

      console.error(error)
      throw new Error('メール送信失敗')
    }

    return true
  }
}
