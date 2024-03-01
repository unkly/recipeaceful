import { DIFFICULTY_KEY, USER_STATUS_KEY } from '@recipeaceful/library/dist/const'
import { Post } from '../../src/entity/Post'
import { ulid } from 'ulid'
import { Calories } from '../../src/valueObject/Calories'
import { Difficulty } from '../../src/valueObject/Difficulty'
import { Material } from '../../src/valueObject/Material'
import { PostDetail } from '../../src/valueObject/PostDetail'
import { PostTitle } from '../../src/valueObject/PostTitle'
import { ProcessDetail } from '../../src/valueObject/ProcessDetail'
import { PostId, UserId } from '../../src/valueObject/Ulid'
import { UserStatus } from '../../src/valueObject/UserStatus'

describe('Post', () => {
  const postId = new PostId(ulid())
  const userId = new UserId(ulid())
  describe('normal cases', () => {
    it('If likes is exists', () => {
      const entity = Post.create({
        postId: postId,
        title: new PostTitle('卵焼き'),
        detail: new PostDetail('ちょー簡単な料理です。'),
        calories: new Calories(120),
        difficulty: new Difficulty(DIFFICULTY_KEY.EASY),
        materials: [
          {
            name: new Material('卵'),
            count: 1
          },
          {
            name: new Material('油'),
            count: 1
          }
        ],
        processes: [
          {
            detail: new ProcessDetail('フライパンを熱して卵を入れます。'),
            image: 'material.png'
          },
          {
            detail: new ProcessDetail('ちょっとしたらフライパンからお皿にのっけて終わり！'),
            image: null
          }
        ],
        userId: userId,
        userStatus: new UserStatus(USER_STATUS_KEY.ACTIVE),
        likes: [new UserId(ulid()), new UserId(ulid()), new UserId(ulid()), new UserId(ulid())]
      })

      expect(entity.postId.get()).toBe(postId.get())
      expect(entity.title.get()).toBe('卵焼き')
      expect(entity.detail.get()).toBe('ちょー簡単な料理です。')
      expect(entity.calories.get()).toBe(120)
      expect(entity.difficulty.get()).toBe(DIFFICULTY_KEY.EASY)
      entity.materials.forEach((material, i) => {
        expect(material.count).toBe(entity.materials[i]?.count)
        expect(material.name.get()).toBe(entity.materials[i]?.name.get())
      })
      entity.processes.forEach((process, i) => {
        expect(process.detail.get()).toBe(entity.processes[i]?.detail.get())
        expect(process.image).toBe(entity.processes[i]?.image)
      })
      expect(entity.userId.get()).toBe(userId.get())
      expect(entity.userStatus.get()).toBe(USER_STATUS_KEY.ACTIVE)
      entity.likes?.forEach((like, i) => {
        expect(like.get()).toBe(entity.likes![i]?.get())
      })
      expect(entity.likesCount).toBe(4)
    })
    it('do not exist', () => {
      const entity = Post.create({
        postId: postId,
        title: new PostTitle('卵焼き'),
        detail: new PostDetail('ちょー簡単な料理です。'),
        calories: new Calories(120),
        difficulty: new Difficulty(DIFFICULTY_KEY.EASY),
        materials: [
          {
            name: new Material('卵'),
            count: 1
          }
        ],
        processes: [
          {
            detail: new ProcessDetail('フライパンを熱して卵を入れます。'),
            image: 'material.png'
          }
        ],
        userId: userId,
        userStatus: new UserStatus(USER_STATUS_KEY.ACTIVE),
        likes: null
      })

      expect(entity.likes).toStrictEqual(null)
      expect(entity.likesCount).toBe(0)
    })
  })
  describe('error cases', () => {
    it('If the processes does not exist', () => {
      expect(() =>
        Post.create({
          postId: postId,
          title: new PostTitle('卵焼き'),
          detail: new PostDetail('ちょー簡単な料理です。'),
          calories: new Calories(120),
          difficulty: new Difficulty(DIFFICULTY_KEY.EASY),
          materials: [
            {
              name: new Material('卵'),
              count: 1
            }
          ],
          processes: [],
          userId: userId,
          userStatus: new UserStatus(USER_STATUS_KEY.ACTIVE),
          likes: null
        })
      ).toThrow('プロセスが設定されていません postId: ' + postId.get())
    })
    it('If the materials does not exist', () => {
      expect(() =>
        Post.create({
          postId: postId,
          title: new PostTitle('卵焼き'),
          detail: new PostDetail('ちょー簡単な料理です。'),
          calories: new Calories(120),
          difficulty: new Difficulty(DIFFICULTY_KEY.EASY),
          materials: [],
          processes: [
            {
              detail: new ProcessDetail('フライパンを熱して卵を入れます。'),
              image: 'material.png'
            }
          ],
          userId: userId,
          userStatus: new UserStatus(USER_STATUS_KEY.ACTIVE),
          likes: null
        })
      ).toThrow('材料が指定されていません postId: ' + postId.get())
    })
    it('If like list include me', () => {
      expect(() =>
        Post.create({
          postId: postId,
          title: new PostTitle('卵焼き'),
          detail: new PostDetail('ちょー簡単な料理です。'),
          calories: new Calories(120),
          difficulty: new Difficulty(DIFFICULTY_KEY.EASY),
          materials: [
            {
              name: new Material('卵'),
              count: 1
            }
          ],
          processes: [
            {
              detail: new ProcessDetail('フライパンを熱して卵を入れます。'),
              image: 'material.png'
            }
          ],
          userId: userId,
          userStatus: new UserStatus(USER_STATUS_KEY.ACTIVE),
          likes: [userId]
        })
      ).toThrow('自分の投稿にいいねは出来ません userId: ' + userId.get())
    })
    it('If the like list contains the same user at twice', () => {
      const sameId = new UserId(ulid())

      expect(() =>
        Post.create({
          postId: postId,
          title: new PostTitle('卵焼き'),
          detail: new PostDetail('ちょー簡単な料理です。'),
          calories: new Calories(120),
          difficulty: new Difficulty(DIFFICULTY_KEY.EASY),
          materials: [
            {
              name: new Material('卵'),
              count: 1
            }
          ],
          processes: [
            {
              detail: new ProcessDetail('フライパンを熱して卵を入れます。'),
              image: 'material.png'
            }
          ],
          userId: userId,
          userStatus: new UserStatus(USER_STATUS_KEY.ACTIVE),
          likes: [sameId, sameId, new UserId(ulid()), new UserId(ulid()), new UserId(ulid())]
        })
      ).toThrow('同一ユーザーに２回以上いいねされています userId: ' + userId.get())
    })
    it('If the user who submitted the post is not authenticated', () => {
      expect(() =>
        Post.create({
          postId: postId,
          title: new PostTitle('卵焼き'),
          detail: new PostDetail('ちょー簡単な料理です。'),
          calories: new Calories(120),
          difficulty: new Difficulty(DIFFICULTY_KEY.EASY),
          materials: [
            {
              name: new Material('卵'),
              count: 1
            }
          ],
          processes: [
            {
              detail: new ProcessDetail('フライパンを熱して卵を入れます。'),
              image: 'material.png'
            }
          ],
          userId: userId,
          userStatus: new UserStatus(USER_STATUS_KEY.PENDING),
          likes: null
        })
      ).toThrow('登録済みのユーザー以外は投稿はできません')
    })
  })
})
