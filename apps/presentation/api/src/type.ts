/* eslint-disable no-unused-vars */
import { AppSyncResolverEvent, Callback, Context } from 'aws-lambda'
import { Mutation, MutationRegisterUserArgs, ReturnResultPayload } from './generated/graphql'
import { registerUser } from './functions/mutation/registerUser/resolver'

export type ResolverFunction<Args, Source, Result> = (
  event: AppSyncResolverEvent<Args, Source>,
  context: Context,
  callback: Callback
) => Promise<Result>

export type MutationResolver = {
  registerUser: ResolverFunction<MutationRegisterUserArgs, unknown, Mutation['registerUser'] | null>
}

export const Resolvers: MutationResolver = {
  registerUser: registerUser
}
