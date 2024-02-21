import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '../components/shared/Layout'
import '../components/shared/global.css'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <>
    <Head>
      <title>recipeaceful</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
    </Head>
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  </>
)

export default App
