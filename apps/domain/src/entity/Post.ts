import { ArrayUtil } from '@recipeaceful/library/dist/utils/array'
import { Entity } from '../seed'
import { Calories } from '../value_object/Calories'
import { Difficulty } from '../value_object/Difficulty'
import { Material } from '../value_object/Material'
import { PostDetail } from '../value_object/PostDetail'
import { PostTitle } from '../value_object/PostTitle'
import { ProcessDetail } from '../value_object/ProcessDetail'
import { Uuid } from '../value_object/Uuid'
import { User } from './User'

type Props = {
  postId: Uuid
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
  user: User
  likes: User[] | null
}

/**
 * 投稿
 */
export class Post extends Entity {
  private constructor(readonly _props: Props) {
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
      if (props.likes.find((like) => like.userId.get() === props.user.userId.get()))
        throw new Error(`自分の投稿にいいねは出来ません userId: ${props.user.userId.get()}`)

      // likesにuserIdが同じユーザーは二人以上存在しない
      if (props.likes.length !== ArrayUtil.objectUnique(props.likes, 'userId').length)
        throw new Error(`同一ユーザーに２回以上いいねされています userId: ${props.user.userId.get()}
      `)
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

  get user() {
    return this._props.user
  }

  get likes() {
    return this._props.likes
  }

  get likesCount(): number {
    return this._props.likes?.length || 0
  }
}
