import { PrismaClient } from '@repo/database'
import { ACTION_DIVISION_KEY } from '@recipeaceful/library/src/const'
import { getCurrentDate } from '@recipeaceful/library/dist/utils/date'
import { ulid } from 'ulid'

export const createMailTemplateForRegisterUser = async () => {
  try {
    const prisma = new PrismaClient()

    await prisma.mail_Template.create({
      data: {
        mailTemplateId: ulid(),
        actionDivision: ACTION_DIVISION_KEY.EMAIL_VARIFY,
        content: `
recipeacefulにご登録いただきありがとうございます。

下記リンクをクリックしてメール認証を完了してください
%%VERIFY_URL%%


recipeaceful
      `,
        createdAt: getCurrentDate(),
        createdBy: 'createMailTemplateForRegisterUser'
      }
    })
  } catch (error) {
    console.error(error)
  }
}

createMailTemplateForRegisterUser()
