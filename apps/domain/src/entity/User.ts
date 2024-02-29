import { UserStatus } from '../value_object/UserStatus'
import { Entity } from '../seed'
import { MailAddress } from '../value_object/MailAddress'
import { UserName } from '../value_object/UserName'
import { ArrayUtil } from '@recipeaceful/library/dist/utils/array'
import { Post } from './Post'
import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { Ulid } from 'value_object/Ulid'

type Props = {
  userId: Ulid
  name: UserName
  email: MailAddress
  password: string
  icon: string | null
  status: UserStatus
  follows: User[] | null
  followers: User[] | null
  posts: Post[] | null
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
      if (props.followers?.find((follower) => follower.userId.get() === props.userId.get())) {
        throw new Error(`自分をフォローは出来ません userId: ${props.userId.get()}`)
      }
      // followerにuserIdが同じユーザーは二人以上存在しない
      if (props.followers.length !== ArrayUtil.objectUnique(props.followers, 'userId').length) {
        throw new Error(`同一ユーザーに２回以上フォローされています userId: ${props.userId.get()}`)
      }
    }

    // ユーザーが仮登録中の場合投稿・いいね・フォローはできない
    if (props.status.get() !== USER_STATUS_KEY.ACTIVE) {
      if (props.follows?.length) throw new Error(`仮登録中はユーザーをフォローできません`)

      if (props.posts?.length) throw new Error(`仮登録中は投稿にいいねできません`)
    }
  }

  get name() {
    return this._props.name
  }

  get email() {
    return this._props.email
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
