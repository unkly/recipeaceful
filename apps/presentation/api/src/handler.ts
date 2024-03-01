import { AppSyncResolverEvent, AppSyncResolverHandler, Callback, Context } from 'aws-lambda'
import { Resolvers } from './type'

export const handler: AppSyncResolverHandler<IArguments, unknown, unknown> = async (
  event: AppSyncResolverEvent<IArguments, unknown>,
  context: Context,
  callback: Callback
) => {
  const resolver: any = Resolvers[event.info.fieldName as keyof typeof Resolvers]
  if (resolver) {
    return resolver(event, context, callback)
  } else {
    throw new Error(`Resolver not found for "${event.info.fieldName}"`)
  }
}
