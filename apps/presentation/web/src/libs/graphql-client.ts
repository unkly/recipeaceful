import { GraphQLClient } from 'graphql-request'

const url = process.env.NEXT_PUBLIC_API_URL || ''

export const graphqlClient = (jwt?: string) => {
  if (!jwt) return new GraphQLClient(url)

  return new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}
