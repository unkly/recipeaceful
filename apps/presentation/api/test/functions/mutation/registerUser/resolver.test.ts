import { RegisterUserUseCase } from '@recipeaceful/usecase/dist/RegisterUserUseCase'
import { registerUser } from '../../../../src/functions/mutation/registerUser/resolver'
import { mockCallback, mockContext, mockEvent } from '../../../mocks/event'
import { validate } from 'class-validator'
import { RegisterUserDto } from '../../../../src/functions/mutation/registerUser/dto'
import { CallbackError, ValidateError } from '../../../../src/error'

describe('registerUser', () => {
  it('normal case', async () => {
    jest.spyOn(RegisterUserUseCase.prototype, 'register').mockResolvedValue(true)

    const response = await registerUser(
      mockEvent({ input: { email: 'test@example.com', password: 'test12445', name: 'テスト 太郎' } }, 'registerUser'),
      mockContext,
      mockCallback
    )

    expect(response!.result).toBe(true)
  })
  describe('error case', () => {
    it('validation error', async () => {
      const mockCallback = jest.fn()

      await registerUser(
        mockEvent({ input: { email: 'test@example.com', password: 'test12445', name: '' } }, 'registerUser'),
        mockContext,
        mockCallback
      )

      const errors = await validate(
        new RegisterUserDto({ input: { email: 'test@example.com', password: 'test12445', name: '' } })
      )
      expect(mockCallback).toHaveBeenCalledWith(null, new CallbackError(new ValidateError(errors).text(), 'ERROR'))
    })
    it('other error', async () => {
      const mockCallback = jest.fn()
      jest.spyOn(RegisterUserUseCase.prototype, 'register').mockRejectedValue(new Error('error'))

      await registerUser(
        mockEvent({ input: { email: 'test@example.com', password: 'test12445', name: 'テスト 太郎' } }, 'registerUser'),
        mockContext,
        mockCallback
      )

      expect(mockCallback).toHaveBeenCalledWith(null, new CallbackError('登録に失敗しました', 'ERROR'))
    })
  })
})
