import { User } from '@recipeaceful/domain/dist/entity/User'
import { IRegisterUserRepository } from '@recipeaceful/domain/dist/repository/user/IRegisterUserRepository'
import { IEmailQueryService } from '@recipeaceful/domain/dist/queryService/IEmailQueryService'
import { ACTION_DIVISION_KEY } from '@recipeaceful/library/dist/const/index'
import { ActionDivision } from '@recipeaceful/domain/dist/value_object/ActionDivision'

export class RegisterUserUseCase {
  constructor(
    private readonly _registerUserRepository: IRegisterUserRepository,
    private readonly _emailQueryService: IEmailQueryService
  ) {}

  async register(user: User): Promise<boolean> {
    // DB登録
    await this._registerUserRepository.execute(user)

    // メール通知履歴登録
    const content = await this._emailQueryService.findContentFromActionDivision(
      ActionDivision.create(ACTION_DIVISION_KEY.EMAIL_VARIFY)
    )

    // メール送信

    // メール通知履歴更新

    return true
  }
}
