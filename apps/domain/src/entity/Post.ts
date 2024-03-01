import { Entity } from '../seed'
import { Calories } from '../valueObject/Calories'
import { Difficulty } from '../valueObject/Difficulty'
import { Material } from '../valueObject/Material'
import { PostDetail } from '../valueObject/PostDetail'
import { PostTitle } from '../valueObject/PostTitle'
import { ProcessDetail } from '../valueObject/ProcessDetail'
import { USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { Ulid } from 'valueObject/Ulid'
import { UserStatus } from 'valueObject/UserStatus'

type Props = {
  postId: Ulid
  title: PostTitle
  detail: PostDetail
  calories: Calories
  difficulty: Difficulty
  materials: {
    name: Material
    count: number
  }[]
  processes: {
    detail: ProcessDetail
    image: string | null
  }[]
  userId: Ulid
  userStatus: UserStatus
  // userId
  likes: Ulid[] | null
}

/**
 * 投稿
 */
export class Post extends Entity {
  private constructor(private readonly _props: Props) {
    super()
  }

  public static create(props: Props) {
    this.validate(props)
    return new Post(props)
  }

  public static validate(props: Props) {
    // プロセスは一つ以上存在する
    if (props.processes.length === 0) throw new Error(`プロセスが設定されていません postId: ${props.postId.get()}`)

    // 材料は１種類以上存在する
    if (props.materials.length === 0) throw new Error(`材料が指定されていません postId: ${props.postId.get()}`)

    if (props.likes?.length) {
      // 自分の投稿にはいいね出来ない
      if (props.likes.find((like) => like.get() === props.userId.get()))
        throw new Error(`自分の投稿にいいねは出来ません userId: ${props.userId.get()}`)

      // likesにuserIdが同じユーザーは二人以上存在しない
      if (props.likes.length !== new Set(props.likes).size)
        throw new Error(`同一ユーザーに２回以上いいねされています userId: ${props.userId.get()}
      `)
    }

    if (props.userStatus.get() !== USER_STATUS_KEY.ACTIVE) {
      throw new Error(`登録済みのユーザー以外は投稿はできません`)
    }
  }

  get postId() {
    return this._props.postId
  }

  get title() {
    return this._props.title
  }

  get detail() {
    return this._props.detail
  }

  get calories() {
    return this._props.calories
  }

  get difficulty() {
    return this._props.difficulty
  }

  get materials() {
    return this._props.materials
  }

  get processes() {
    return this._props.processes
  }

  get userId() {
    return this._props.userId
  }

  get userStatus() {
    return this._props.userStatus
  }

  get likes() {
    return this._props.likes
  }

  get likesCount(): number {
    return this._props.likes?.length || 0
  }
}
