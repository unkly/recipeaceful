import crypto, { BinaryLike } from 'crypto'
import { addDays } from 'date-fns'

type Props = {
  userId: string
  expiredDays: number
}

const header = { algorithm: 'HS256', type: 'JWT' }

export const createToken = (args: Props): string => {
  const currentDateAtUnix = Math.floor(Date.now() / 1000)
  const claims = { sub: args.userId, iat: currentDateAtUnix, expiredAt: addDays(new Date(), args.expiredDays) }
  const unsignedToken = `${generateBase64(header)}.${generateBase64(claims)}`
  const signature = HMAC_SHA256(unsignedToken)
  const jwt = `${unsignedToken}.${signature}`

  return jwt
}

export const authenticateToken = (jwt: string): boolean => {
  const splits = jwt.split('.')
  const unsignedToken = [splits[0], splits[1]].join('.')
  const signature = splits[2]

  if (HMAC_SHA256(unsignedToken) !== signature) {
    throw new Error('認証失敗')
  }

  return true
}

const generateBase64 = (json: object) => {
  const jsonStr = JSON.stringify(json)
  const jsonBase64 = Buffer.from(jsonStr).toString('base64')
  const jsonBase64NoPadding = jsonBase64.replace(/={1,2}$/, '')
  return jsonBase64NoPadding
}

const HMAC_SHA256 = (data: BinaryLike) => {
  const hash = crypto
    .createHmac('sha256', process.env.AUTHENTICATION_SECRET || '')
    .update(data)
    .digest('base64')
  const hashNoPadding = hash.replace(/={1,2}$/, '')
  return hashNoPadding
}
