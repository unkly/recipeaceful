import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

export const useExactSession = (): Session => {
  const { data: session } = useSession()

  return session as Session
}
