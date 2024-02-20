import { MutationRegisterUserArgs, ReturnResultPayload } from '../../../generated/graphql'
import { Context } from '../../../type'
import { authenticate, hash } from '../../../utils/authenticate'

export const registerUser = async (
  parent: unknown,
  args: MutationRegisterUserArgs,
  context: Context
): Promise<ReturnResultPayload> => {
  authenticate(context.request.headers.get('authorization'))

  console.log(hash(args.input.password))
  return {
    result: false
  }
}
