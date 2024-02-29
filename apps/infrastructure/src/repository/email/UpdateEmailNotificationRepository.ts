import { PrismaClient } from '@repo/database'
import { Email } from '@recipeaceful/domain/dist/entity/Email'
import { EmailTemplate } from '@recipeaceful/domain/dist/entity/EmailTemplate'
import { IUpdateEmailNotificationRepository } from '@recipeaceful/domain/dist/repository/email/IUpdateEmailNotificationRepository'
import { ActionDivision } from '@recipeaceful/domain/dist/valueObject/ActionDivision'
import { MailAddress } from '@recipeaceful/domain/dist/valueObject/MailAddress'
import { NotificationStatus } from '@recipeaceful/domain/dist/valueObject/NotificationStatus'
import { Ulid } from '@recipeaceful/domain/dist/valueObject/Ulid'
import { getCurrentDate } from '@recipeaceful/library/dist/utils/date'

export class UpdateEmailNotificationRepository implements IUpdateEmailNotificationRepository {
  async execute(email: Email): Promise<Email> {
    const prisma = new PrismaClient()
    const updatedEmail = await prisma.mail_Notification.update({
      data: {
        actionDivision: email.template.actionDivision.get(),
        status: email.status.get(),
        content: email.template.content,
        mailTemplateId: email.template.templateId.get(),
        updatedAt: getCurrentDate(),
        updatedBy: 'UpdateEmailNotificationRepository',
        email: email.email.get()
      },
      where: {
        mailNotificationId: email.notificationId.get()
      }
    })

    return Email.create({
      notificationId:new Ulid(updatedEmail.mailNotificationId),
      template: EmailTemplate.create({
        templateId: new Ulid(updatedEmail.mailTemplateId),
        actionDivision: new ActionDivision(updatedEmail.actionDivision),
        content: updatedEmail.content
      }),
      status: new NotificationStatus(updatedEmail.status),
      email: new MailAddress(updatedEmail.email)
    })
  }
}
