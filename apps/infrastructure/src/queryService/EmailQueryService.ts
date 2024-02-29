import { PrismaClient } from '@repo/database'
import { IEmailQueryService } from '@recipeaceful/domain/dist/queryService/IEmailQueryService'
import { ActionDivision } from '@recipeaceful/domain/dist/valueObject/ActionDivision'

export class EmailQueryService implements IEmailQueryService {
  async findContentFromActionDivision(actionDivision: ActionDivision): Promise<string> {
    const prisma = new PrismaClient()
    const mailTemplate = await prisma.mail_Template.findFirst({
      where: { actionDivision: actionDivision.get() },
      select: {
        content: true
      }
    })

    if (!mailTemplate) {
      throw new Error(`メールテンプレート取得失敗: actionDivision: ${actionDivision.get()}`)
    }

    return mailTemplate.content
  }
}
