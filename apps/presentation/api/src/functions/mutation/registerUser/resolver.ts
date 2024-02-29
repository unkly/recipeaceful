import { Mutation, MutationRegisterUserArgs, ReturnResultPayload } from '../../../generated/graphql'
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
import { UserName } from '@recipeaceful/domain/dist/value_object/UserName'
import { MailAddress } from '@recipeaceful/domain/dist/value_object/MailAddress'
import { UserStatus } from '@recipeaceful/domain/dist/value_object/UserStatus'
import { validate } from 'class-validator'
import { Ulid } from '@recipeaceful/domain/dist/value_object/Ulid'
import { ulid } from 'ulid'
import { AppSyncResolverEvent, Callback, Context } from 'aws-lambda'
import { CallbackError, ValidateError } from '../../../error'

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
        userId: Ulid.create(ulid()),
        name: UserName.create(dto.name),
        email: MailAddress.create(dto.email),
        password: dto.password,
        icon: null,
        status: UserStatus.create(USER_STATUS_KEY.PENDING),
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
