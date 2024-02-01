import { PrismaClient } from '@prisma/client'

export type GraphQLContext = {
  prisma: PrismaClient
}

export function createContext(): GraphQLContext {
  const prisma = new PrismaClient()
  return { prisma }
}
