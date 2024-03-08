'use client'
import { SessionProvider } from 'next-auth/react'
import { Layout } from '../components/shared/Layout'
import '../components/shared/global.css'
import '../mocks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout({ session, children }: { session: any; children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })
  return (
    <html lang="ja-JP">
      <body>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <Layout>{children}</Layout>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
