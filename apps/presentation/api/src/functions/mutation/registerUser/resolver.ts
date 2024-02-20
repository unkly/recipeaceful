import { MutationRegisterUserArgs, ReturnResultPayload } from '../../../generated/graphql'
import { Context } from '../../../type'
import { authenticate } from '../../../utils/authenticate'

export const registerUser = async (
  parent: unknown,
  args: MutationRegisterUserArgs,
  context: Context
): Promise<ReturnResultPayload> => {
  authenticate(context.request.headers.get('authorization'))

  return {
    result: false
  }
}
