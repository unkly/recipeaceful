'use client'
import { Button, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { RegisterFormSchema, registerSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@emotion/react'
import { theme } from '../../../constants/theme'
import { mutationRegisterUser } from '@/api/mutation/registerUser'

export const RegisterPage = () => {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'authenticated') void router.push('/timeline')

  return <RegisterUser />
}

const useRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = handleSubmit(async (data: RegisterFormSchema) => {
    await mutationRegisterUser({ input: data })
  })

  return {
    control,
    onSubmit,
    errors
  }
}

const RegisterUser = () => {
  const { control, onSubmit, errors } = useRegister()
  return (
    <main css={styles.rootContainer}>
      <form
        onSubmit={onSubmit}
        css={styles.form}>
        <div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                css={styles.input}
                variant="standard"
                placeholder="メールアドレス"
                type="email"
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                css={styles.input}
                variant="standard"
                placeholder="ニックネーム"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                css={styles.input}
                variant="standard"
                type="password"
                placeholder="パスワード"
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          css={styles.button}>
          新規作成
        </Button>
      </form>
    </main>
  )
}

const styles = {
  rootContainer: css`
    display: grid;
    gap: 12px;
    text-align: center;
  `,
  form: css`
    margin: 10% auto;
  `,
  bottom: css`
    display: flex;
    text-align: center;
    align-items: center;
    margin: 0;
    justify-content: space-between;
  `,
  flexContainer: css`
    display: flex;
  `,
  checkbox: css`
    width: 24px;
    height: 24px;
    align-items: center;
    margin-right: 4px;
    margin-left: -2px;
  `,
  text: css``,
  input: css`
    padding: 12px 0;
    width: 360px;
  `,
  link: css`
    text-decoration: none;
    color: ${theme.colors.blue.A200};
  `,
  button: css`
    background-color: ${theme.colors.blue.A200};
    margin-top: 12px;
  `
}
