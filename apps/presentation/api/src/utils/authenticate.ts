import { authenticateToken } from './token'
import crypto from 'crypto'

export const authenticate = (jwt: string | null) => {
  if (!jwt) return null
  authenticateToken(jwt)

  return true
}

export const hash = (password: string) => {
  const hash = crypto.createHash('sha512').update(password).digest('hex')
  return hash
}
