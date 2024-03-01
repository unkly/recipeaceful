import { PrismaClient } from '@repo/database'
import { Email } from '@recipeaceful/domain/dist/entity/Email'
import { IRegisterEmailNotificationRepository } from '@recipeaceful/domain/dist/repository/email/IRegisterEmailNotificationRepository'

export class RegisterEmailNotificationRepository implements IRegisterEmailNotificationRepository {
  async execute(email: Email): Promise<void> {
    const prisma = new PrismaClient()

    await prisma.mail_Notification.create({
      data: {
        mailNotificationId: email.notificationId.get(),
        mailTemplateId: email.template.templateId.get(),
        actionDivision: email.template.actionDivision.get(),
        content: email.template.content,
        status: email.status.get(),
        email: email.email.get(),
        createdBy: 'RegisterEmailNotificationRepository'
      }
    })
  }
}
