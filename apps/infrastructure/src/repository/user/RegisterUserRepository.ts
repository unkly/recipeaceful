import { PrismaClient } from '@repo/database'
import { User } from '@recipeaceful/domain/dist/entity/User'
import { IRegisterUserRepository } from '@recipeaceful/domain/dist/repository/user/IRegisterUserRepository'
import { getCurrentDate } from '@recipeaceful/library/dist/utils/date'
import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'

export class RegisterUserRepository implements IRegisterUserRepository {
  async execute(user: User): Promise<boolean> {
    const prisma = new PrismaClient()
    // すでに存在するユーザーか確認
    const existUser = await prisma.user.findUnique({
      where: { email: user.email.get() }
    })

    if (existUser) {
      throw new Error(`すでに存在するユーザーです。`)
    }

    // 新規登録
    await prisma.user.create({
      data: {
        userId: user.userId.get(),
        email: user.email.get(),
        name: user.name.get(),
        createdAt: getCurrentDate(),
        createdBy: 'RegisterUserRepository',
        status: USER_STATUS_KEY.PENDING
      }
    })

    return true
  }
}
