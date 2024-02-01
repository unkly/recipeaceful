import { Entity } from '../seed'
import { MailAddress } from '../value_object/MailAddress'
import { UserName } from '../value_object/UserName'
import { Uuid } from '../value_object/Uuid'
import { ArrayUtil } from '@recipeaceful/library/dist/utils/array'

type Props = {
  userId: Uuid
  name: UserName
  mailAddress: MailAddress
  icon: string | null
  followers: User[] | null
}

/**
 * ユーザー
 */
export class User extends Entity {
  private constructor(readonly _props: Props) {
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
  }

  get name() {
    return this._props.name
  }

  get mailAddress() {
    return this._props.mailAddress
  }

  get icon() {
    return this._props.icon
  }

  get userId() {
    return this._props.userId
  }
}
