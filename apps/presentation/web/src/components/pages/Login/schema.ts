import { z } from 'zod'
import { regex } from '../../../constants/regex'

export const userSchema = z.object({
  mailAddress: z.string({ invalid_type_error: '必須項目です', required_error: '必須項目です' }).regex(regex.MAIL_ADDRESS, 'メールアドレスが正しくありません'),
  password: z.string({ invalid_type_error: '必須項目です', required_error: '必須項目です' }).regex(regex.PASSWORD, 'パスワード要件に達していません。')
})
