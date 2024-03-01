import { IsNotEmpty } from 'class-validator'
import { Error } from '@recipeaceful/library/dist/const/Error'
import { MutationRegisterUserArgs } from '../../../generated/graphql'

export class RegisterUserDto {
  @IsNotEmpty({ message: Error.Dto.Required, context: Error.Dto.Required })
  email: string

  @IsNotEmpty({ message: Error.Dto.Required, context: Error.Dto.Required })
  password: string

  @IsNotEmpty({ message: Error.Dto.Required, context: Error.Dto.Required })
  name: string

  constructor(args: MutationRegisterUserArgs) {
    this.email = args.input.email
    this.password = args.input.password
    this.name = args.input.name
  }
}
