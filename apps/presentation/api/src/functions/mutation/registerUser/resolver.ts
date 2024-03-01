import { Mutation, MutationRegisterUserArgs } from '../../../generated/graphql'
import { RegisterUserDto } from './dto'
import { RegisterUserUseCase } from '@recipeaceful/usecase/dist/RegisterUserUseCase'
import { RegisterUserRepository } from '@recipeaceful/infrastructure/dist/repository/user/RegisterUserRepository'
import { EmailQueryService } from '@recipeaceful/infrastructure/dist/queryService/EmailQueryService'
import { RegisterEmailNotificationRepository } from '@recipeaceful/infrastructure/dist/repository/email/RegisterEmailNotificationRepository'
import { SendVerificationEmailRepository } from '@recipeaceful/infrastructure/dist/repository/email/SendVerificationEmailRepository'
import { UpdateEmailNotificationRepository } from '@recipeaceful/infrastructure/dist/repository/email/UpdateEmailNotificationRepository'
import { SESUtil } from '@recipeaceful/library/dist/utils/ses'
import { SES } from 'aws-sdk'
import { AWS_REGION, USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { User } from '@recipeaceful/domain/dist/entity/User'
import { UserName } from '@recipeaceful/domain/dist/valueObject/UserName'
import { MailAddress } from '@recipeaceful/domain/dist/valueObject/MailAddress'
import { UserStatus } from '@recipeaceful/domain/dist/valueObject/UserStatus'
import { validate } from 'class-validator'
import { ulid } from 'ulid'
import { AppSyncResolverEvent, Callback, Context } from 'aws-lambda'
import { CallbackError, ValidateError } from '../../../error'
import { UserId } from '@recipeaceful/domain/dist/valueObject/Ulid'

export const registerUser = async (
  event: AppSyncResolverEvent<MutationRegisterUserArgs, unknown>,
  _context: Context,
  callback: Callback
): Promise<Mutation['registerUser'] | null> => {
  const dto = new RegisterUserDto(event.arguments)
  const errors = await validate(dto)

  if (errors.length) {
    console.error(errors)
    callback(null, new CallbackError(new ValidateError(errors).text(), 'ERROR'))
    return null
  }

  const useCase = new RegisterUserUseCase(
    new RegisterUserRepository(),
    new EmailQueryService(),
    new RegisterEmailNotificationRepository(),
    new SendVerificationEmailRepository(new SESUtil(new SES({ region: AWS_REGION }))),
    new UpdateEmailNotificationRepository()
  )

  try {
    await useCase.register(
      User.create({
        userId: new UserId(ulid()),
        name: new UserName(dto.name),
        email: new MailAddress(dto.email),
        password: dto.password,
        icon: null,
        status: new UserStatus(USER_STATUS_KEY.PENDING),
        follows: null,
        followers: null,
        posts: null
      })
    )

    return {
      result: true
    }
  } catch (error) {
    console.error(error)
    callback(null, new CallbackError('登録に失敗しました', 'ERROR'))
    return null
  }
}
