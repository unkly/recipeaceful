import { makeExecutableSchema } from '@graphql-tools/schema'
import { User, typeDefs } from './generated/graphql'
import { PrismaClient } from '@prisma/client'
import { registerUser } from './functions/mutation/registerUser/resolver'

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      const prisma = new PrismaClient()
      const users = await prisma.user.findMany()
      return users.map((user) => {
        return {
          id: user.userId,
          email: user.email,
          name: user.name
        }
      })
    }
  },
  Mutation: {
    registerUser: registerUser
  }
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: typeDefs
})
