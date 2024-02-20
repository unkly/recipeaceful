import { authenticateToken } from './token'

export const authenticate = (jwt: string | null) => {
  if (!jwt) return null
  authenticateToken(jwt)

  return true
}
