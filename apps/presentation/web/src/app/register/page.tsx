import { RegisterPage } from '@/components/pages/Register/Register'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'recipeaceful - 登録',
  viewport: 'width=device-width, initial-scale=1'
}

export default function RegisterUser() {
  return <RegisterPage />
}
