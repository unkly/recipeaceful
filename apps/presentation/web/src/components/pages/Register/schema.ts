import { z } from 'zod'
import { regex } from '../../../constants/regex'

export const registerSchema = z.object({
  email: z
    .string({ invalid_type_error: '必須項目です', required_error: '必須項目です' })
    .regex(regex.MAIL_ADDRESS, 'メールアドレスが正しくありません'),
  password: z
    .string({ invalid_type_error: '必須項目です', required_error: '必須項目です' })
    .regex(regex.PASSWORD, 'パスワード要件に達していません。'),
  name: z
    .string({ invalid_type_error: '必須項目です', required_error: '必須項目です' })
    .min(1, '必須項目です')
    .max(20, '20文字以内で入力してください')
})

export type RegisterFormSchema = z.infer<typeof registerSchema>
