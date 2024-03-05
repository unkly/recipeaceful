import { z } from 'zod'
import { regex } from '../../../constants/regex'

export const loginSchema = z.object({
  email: z
    .string({ invalid_type_error: '必須項目です', required_error: '必須項目です' })
    .regex(regex.MAIL_ADDRESS, 'メールアドレスが正しくありません'),
  password: z
    .string({ invalid_type_error: '必須項目です', required_error: '必須項目です' })
    .regex(regex.PASSWORD, 'パスワード要件に達していません。')
})

export type LoginFormSchema = z.infer<typeof loginSchema>
