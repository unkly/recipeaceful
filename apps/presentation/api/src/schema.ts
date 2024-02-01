import { makeExecutableSchema } from '@graphql-tools/schema'
import { User, typeDefs } from './generated/graphql'
import { PrismaClient } from '@prisma/client'
import { GraphQLContext } from './context'

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      const prisma = new PrismaClient()
      const users = await prisma.user.findMany()
      return users.map((user) => {
        return {
          id: user.uuid,
          email: user.email,
          name: user.name
        }
      })
    }
  }
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: typeDefs
})
