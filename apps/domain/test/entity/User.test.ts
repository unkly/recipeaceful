import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { User } from '../../src/entity/User'
import { ulid } from 'ulid'
import { MailAddress } from '../../src/valueObject/MailAddress'
import { Ulid } from '../../src/valueObject/Ulid'
import { UserName } from '../../src/valueObject/UserName'
import { UserStatus } from '../../src/valueObject/UserStatus'

describe('User', () => {
  const id = new Ulid(ulid())
  const mailAddress = new MailAddress('test@example.com')
  describe('normal case', () => {
    it('If icon and follows, fllowers, posts is exists', () => {
      const entity = User.create({
        userId: id,
        name: new UserName('テスト 太郎'),
        email: mailAddress,
        password: '123456',
        icon: 'icon.png',
        status: new UserStatus(USER_STATUS_KEY.ACTIVE),
        follows: [new Ulid(ulid()), new Ulid(ulid())],
        followers: [new Ulid(ulid())],
        posts: [new Ulid(ulid())]
      })

      expect(entity.userId.get()).toBe(id.get())
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
        userId: id,
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
    const sameId = new Ulid(ulid())
    it('If my followers list contains myself', () => {
      expect(() =>
        User.create({
          userId: id,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [new Ulid(ulid()), new Ulid(ulid())],
          followers: [id],
          posts: [new Ulid(ulid())]
        })
      ).toThrow(`自分をフォローは出来ません userId: ${id.get()}`)
    })
    it('If my follows list contains myself', () => {
      expect(() =>
        User.create({
          userId: id,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [id],
          followers: [new Ulid(ulid())],
          posts: [new Ulid(ulid())]
        })
      ).toThrow(`自分をフォローは出来ません userId: ${id.get()}`)
    })
    it('If the same user is in the followers list more than once', () => {
      expect(() =>
        User.create({
          userId: id,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [new Ulid(ulid())],
          followers: [sameId, sameId],
          posts: [new Ulid(ulid())]
        })
      ).toThrow(`同一ユーザーに２回以上フォローされています userId: ${id.get()}`)
    })
    it('If the same user is in the follows list more than once', () => {
      expect(() =>
        User.create({
          userId: id,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.ACTIVE),
          follows: [sameId, sameId],
          followers: [new Ulid(ulid())],
          posts: [new Ulid(ulid())]
        })
      ).toThrow(`同一ユーザーを２回以上フォローしています userId: ${id.get()}`)
    })
    it('if the user is not activated but the post does exist', () => {
      expect(() =>
        User.create({
          userId: id,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.PENDING),
          follows: null,
          followers: [new Ulid(ulid())],
          posts: [new Ulid(ulid())]
        })
      ).toThrow(`仮登録中は投稿できません`)
    })
    it('if the user is not activated but the follows list does exist', () => {
      expect(() =>
        User.create({
          userId: id,
          name: new UserName('テスト 太郎'),
          email: mailAddress,
          password: '123456',
          icon: 'icon.png',
          status: new UserStatus(USER_STATUS_KEY.PENDING),
          follows: [new Ulid(ulid())],
          followers: [new Ulid(ulid())],
          posts: null
        })
      ).toThrow(`仮登録中はユーザーをフォローできません`)
    })
  })
})
