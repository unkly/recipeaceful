import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      mailAddress: string
    }
    accessToken: string
    refreshToken: string
    accessTokenExpires: string
  }

  interface User {
    user: {
      name: string
      mailAddress: string
    }
    accessToken: string
    refreshToken: string
    accessTokenExpires: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
    accessTokenExpires: string
  }
}
