import { LoginPage } from '../../components/pages/Login/Login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'recipeaceful - ログイン',
  viewport: 'width=device-width, initial-scale=1'
}

export default function Login() {
  return <LoginPage />
}
