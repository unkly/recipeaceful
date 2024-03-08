import { mockRegisterUserMutation } from '@/graphql/generated/mock'

export const registerUserHandler = mockRegisterUserMutation((req, res, ctx) => {
  return res(
    ctx.data({
      registerUser: {
        result: true
      }
    })
  )
})
