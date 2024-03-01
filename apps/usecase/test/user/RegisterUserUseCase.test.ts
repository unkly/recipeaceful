import { User } from '@recipeaceful/domain/dist/entity/User'
import { IEmailQueryService } from '@recipeaceful/domain/dist/queryService/IEmailQueryService'
import { IRegisterEmailNotificationRepository } from '@recipeaceful/domain/dist/repository/email/IRegisterEmailNotificationRepository'
import { ISendVerificationEmailRepository } from '@recipeaceful/domain/dist/repository/email/ISendVerificationEmailRepository'
import { IUpdateEmailNotificationRepository } from '@recipeaceful/domain/dist/repository/email/IUpdateEmailNotificationRepository'
import { IRegisterUserRepository } from '@recipeaceful/domain/dist/repository/user/IRegisterUserRepository'
import { MailAddress } from '@recipeaceful/domain/dist/valueObject/MailAddress'
import { UserId } from '@recipeaceful/domain/dist/valueObject/Ulid'
import { UserName } from '@recipeaceful/domain/dist/valueObject/UserName'
import { UserStatus } from '@recipeaceful/domain/dist/valueObject/UserStatus'
import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { ulid } from 'ulid'
import { RegisterUserUseCase } from '../../src/user/RegisterUserUseCase'

describe('RegisterUserUseCase', () => {
  describe('normal case', () => {
    const mockRegisterUserRepository: IRegisterUserRepository = {
      execute: jest.fn().mockResolvedValue(true)
    }
    const mockEmailQueryService: IEmailQueryService = {
      findContentFromActionDivision: jest.fn().mockResolvedValue('content')
    }
    const mockRegisterEmailNotificationRepository: IRegisterEmailNotificationRepository = {
      execute: jest.fn().mockResolvedValue(true)
    }
    const mockSendVerificationEmailRepository: ISendVerificationEmailRepository = {
      execute: jest.fn().mockResolvedValue(true)
    }
    const mockUpdateEmailNotificationRepository: IUpdateEmailNotificationRepository = {
      execute: jest.fn().mockResolvedValue(true)
    }
    const usecase = new RegisterUserUseCase(
      mockRegisterUserRepository,
      mockEmailQueryService,
      mockRegisterEmailNotificationRepository,
      mockSendVerificationEmailRepository,
      mockUpdateEmailNotificationRepository
    )
    it('should be successed to send email', async () => {
      await usecase.register(
        User.create({
          userId: new UserId(ulid()),
          name: new UserName('テスト 太郎'),
          email: new MailAddress('test@example.com'),
          password: '123456789',
          icon: null,
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: null,
          followers: null,
          posts: null
        })
      )

      expect(mockRegisterEmailNotificationRepository.execute).toHaveBeenCalled()
      expect(mockEmailQueryService.findContentFromActionDivision).toHaveBeenCalled()
      expect(mockRegisterEmailNotificationRepository.execute).toHaveBeenCalled()
      expect(mockSendVerificationEmailRepository.execute).toHaveBeenCalled()
      expect(mockUpdateEmailNotificationRepository.execute).toHaveBeenCalled()
    })
  })
  describe('error case', () => {
    const mockRegisterUserRepository: IRegisterUserRepository = {
      execute: jest.fn().mockResolvedValue(true)
    }
    const mockEmailQueryService: IEmailQueryService = {
      findContentFromActionDivision: jest.fn().mockResolvedValue('content')
    }
    const mockRegisterEmailNotificationRepository: IRegisterEmailNotificationRepository = {
      execute: jest.fn().mockResolvedValue(true)
    }
    const mockSendVerificationEmailRepository: ISendVerificationEmailRepository = {
      execute: jest.fn().mockImplementation(() => {
        throw new Error('')
      })
    }
    const mockUpdateEmailNotificationRepository: IUpdateEmailNotificationRepository = {
      execute: jest.fn().mockResolvedValue(true)
    }
    const usecase = new RegisterUserUseCase(
      mockRegisterUserRepository,
      mockEmailQueryService,
      mockRegisterEmailNotificationRepository,
      mockSendVerificationEmailRepository,
      mockUpdateEmailNotificationRepository
    )
    it('should be failed to send email', () => {
      expect(() =>
        usecase.register(
          User.create({
            userId: new UserId(ulid()),
            name: new UserName('テスト 太郎'),
            email: new MailAddress('test@example.com'),
            password: '123456789',
            icon: null,
            status: new UserStatus(USER_STATUS_KEY.PENDING),
            follows: null,
            followers: null,
            posts: null
          })
        )
      ).rejects.toThrow('メール送信失敗')
    })
  })
})
