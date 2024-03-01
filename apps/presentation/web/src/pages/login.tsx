import Head from 'next/head'
import { LoginPage } from '../components/pages/Login/Login.page'

export default function Login() {
  return (
    <>
      <Head>
        <title>recipeaceful - ログイン</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <LoginPage />
    </>
  )
}
