'use client'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { LoginFormSchema, loginSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { css } from '@emotion/react'
import { theme } from '../../../constants/theme'
import Link from 'next/link'
import { LoginProvider } from "@/components/shared/LoginProvider"

export const LoginPage = () => {
  return (
    <LoginProvider>
      <Login /> 
    </LoginProvider>
  )
}

const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = handleSubmit(async (data: LoginFormSchema) => {})

  return {
    control,
    onSubmit,
    errors
  }
}

const Login = () => {
  const { control, onSubmit, errors } = useLogin()
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
        <div css={styles.bottom}>
          <div css={styles.flexContainer}>
            <FormControlLabel
              control={<Checkbox />}
              label="ログイン情報を維持する"
            />
          </div>
          <Link
            href={'/register'}
            css={styles.link}>
            新規作成
          </Link>
        </div>
        <Button
          variant="contained"
          type="submit"
          css={styles.button}>
          ログイン
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
