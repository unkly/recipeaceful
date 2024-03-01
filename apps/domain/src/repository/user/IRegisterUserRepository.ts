import { User } from 'entity/User'

export interface IRegisterUserRepository {
  // eslint-disable-next-line no-unused-vars
  execute(user: User): Promise<boolean>
}
