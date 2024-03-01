import { UserStatus } from '../valueObject/UserStatus'
import { Entity } from '../seed'
import { MailAddress } from '../valueObject/MailAddress'
import { UserName } from '../valueObject/UserName'
import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { Ulid } from 'valueObject/Ulid'

type Props = {
  userId: Ulid
  name: UserName
  email: MailAddress
  password: string
  icon: string | null
  status: UserStatus
  follows: Ulid[] | null
  followers: Ulid[] | null
  posts: Ulid[] | null
}

/**
 * ユーザー
 */
export class User extends Entity {
  private constructor(private readonly _props: Props) {
    super()
  }

  public static create(props: Props) {
    this.validate(props)
    return new User(props)
  }

  public static validate(props: Props) {
    if (props.followers?.length) {
      // followerに自分は存在しない
      if (props.followers?.find((follower) => follower.get() === props.userId.get())) {
        throw new Error(`自分をフォローは出来ません userId: ${props.userId.get()}`)
      }
      // followerにuserIdが同じユーザーは二人以上存在しない
      if (props.followers.length !== new Set(props.followers).size) {
        throw new Error(`同一ユーザーに２回以上フォローされています userId: ${props.userId.get()}`)
      }
    }

    if (props.follows?.length) {
      // folowsにuserIdが同じユーザーは二人以上存在しない
      if (props.follows?.length !== new Set(props.follows).size) {
        throw new Error(`同一ユーザーを２回以上フォローしています userId: ${props.userId.get()}`)
      }

      // folowsに自分は存在しない
      if (props.follows?.find((follow) => follow.get() === props.userId.get())) {
        throw new Error(`自分をフォローは出来ません userId: ${props.userId.get()}`)
      }
    }

    // ユーザーが仮登録中の場合投稿・いいね・フォローはできない
    if (props.status.get() !== USER_STATUS_KEY.ACTIVE) {
      if (props.follows?.length) throw new Error(`仮登録中はユーザーをフォローできません`)

      if (props.posts?.length) throw new Error(`仮登録中は投稿できません`)
    }
  }

  get name() {
    return this._props.name
  }

  get email() {
    return this._props.email
  }

  get password() {
    return this._props.password
  }

  get icon() {
    return this._props.icon
  }

  get status() {
    return this._props.status
  }

  get userId() {
    return this._props.userId
  }

  get follows() {
    return this._props.follows
  }

  get followers() {
    return this._props.followers
  }

  get posts() {
    return this._props.posts
  }
}
