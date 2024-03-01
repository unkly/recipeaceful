import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { User } from '../../src/entity/User'
import { ulid } from 'ulid'
import { MailAddress } from '../../src/valueObject/MailAddress'
import { PostId, UserId } from '../../src/valueObject/Ulid'
import { UserName } from '../../src/valueObject/UserName'
import { UserStatus } from '../../src/valueObject/UserStatus'

describe('User', () => {
  const userId = new UserId(ulid())
  const mailAddress = new MailAddress('test@example.com')
  describe('normal case', () => {
    it('If icon and follows, fllowers, posts is exists', () => {
      const entity = User.create({
        userId: userId,
        name: new UserName('テスト 太郎'),
        email: mailAddress,
        password: '123456',
        icon: 'icon.png',
        status: new UserStatus(USER_STATUS_KEY.ACTIVE),
        follows: [new UserId(ulid()), new UserId(ulid())],
        followers: [new UserId(ulid())],
        posts: [new PostId(ulid())]
      })

      expect(entity.userId.get()).toBe(userId.get())
      expect(entity.name.get()).toBe('テスト 太郎')
      expect(entity.email.get()).toBe('test@example.com')
      expect(entity.password).toBe('123456')
      expect(entity.icon).toBe('icon.png')
      expect(entity.status.get()).toBe(USER_STATUS_KEY.ACTIVE)
      expect(entity.follows?.length).toBe(2)
      expect(entity.followers?.length).toBe(1)
      expect(entity.posts?.length).toBe(1)
    })
    it('do not exists', () => {
      const entity = User.create({
        userId: userId,
        name: new UserName('テスト 太郎'),
        email: mailAddress,
        password: '123456',
        icon: null,
        status: new UserStatus(USER_STATUS_KEY.ACTIVE),
        follows: null,
        followers: null,
        posts: null
      })

      expect(entity.icon).toBe(null)
      expect(entity.follows).toBe(null)
      expect(entity.followers).toBe(null)
      expect(entity.posts).toBe(null)
    })
  })
  describe('error case', () => {
    const sameId = new UserId(ulid())
    it('If my followers list contains myself', () => {
      expect(() =>
        User.create({
          userId: userId,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [new UserId(ulid()), new UserId(ulid())],
          followers: [userId],
          posts: [new PostId(ulid())]
        })
      ).toThrow(`自分をフォローは出来ません userId: ${userId.get()}`)
    })
    it('If my follows list contains myself', () => {
      expect(() =>
        User.create({
          userId: userId,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [userId],
          followers: [new UserId(ulid())],
          posts: [new PostId(ulid())]
        })
      ).toThrow(`自分をフォローは出来ません userId: ${userId.get()}`)
    })
    it('If the same user is in the followers list more than once', () => {
      expect(() =>
        User.create({
          userId: userId,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [new UserId(ulid())],
          followers: [sameId, sameId],
          posts: [new PostId(ulid())]
        })
      ).toThrow(`同一ユーザーに２回以上フォローされています userId: ${userId.get()}`)
    })
    it('If the same user is in the follows list more than once', () => {
      expect(() =>
        User.create({
          userId: userId,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [sameId, sameId],
          followers: [new UserId(ulid())],
          posts: [new PostId(ulid())]
        })
      ).toThrow(`同一ユーザーを２回以上フォローしています userId: ${userId.get()}`)
    })
    it('if the user is not activated but the post does exist', () => {
      expect(() =>
        User.create({
          userId: userId,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.PENDING),
          follows: null,
          followers: [new UserId(ulid())],
          posts: [new PostId(ulid())]
        })
      ).toThrow(`仮登録中は投稿できません`)
    })
    it('if the user is not activated but the follows list does exist', () => {
      expect(() =>
        User.create({
          userId: userId,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.PENDING),
          follows: [new UserId(ulid())],
          followers: [new UserId(ulid())],
          posts: null
        })
      ).toThrow(`仮登録中はユーザーをフォローできません`)
    })
  })
})
