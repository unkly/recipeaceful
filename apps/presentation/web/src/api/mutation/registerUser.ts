import { MutationRegisterUserArgs } from '@/graphql/generated/graphql'
import { MUTATION_REGISTER_USER } from '@/graphql/queries'
import { graphqlClient } from '@/libs/graphql-client'
import { SYSTEM_ERROR_MESSAGE } from '@/types/error'
import { GraphQLError } from 'graphql'
import { ClientError } from 'graphql-request'

export const mutationRegisterUser = async (variables: MutationRegisterUserArgs) => {
  const client = graphqlClient()
  try {
    await client.request(MUTATION_REGISTER_USER, variables)
  } catch (e: any) {
    if (e instanceof ClientError) {
      throw e.response.errors?.map((error) => new GraphQLError(error.message))
    }
    throw new Error(SYSTEM_ERROR_MESSAGE)
  }
}
