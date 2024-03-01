import { User } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: { label: 'ユーザー名', type: 'text' },
        password: { label: 'パスワード', type: 'password' }
      },
      authorize: async (credentials): Promise<User | null> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return {
          id: 'a',
          user: {
            name: 'a',
            mailAddress: 'example@example.com'
          },
          accessToken: 'a',
          refreshToken: 'a',
          accessTokenExpires: 'a'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // 最初のサインイン
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken
        }
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.accessTokenExpires = token.accessTokenExpires

      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },

  debug: process.env.NODE_ENV === 'development'
})
