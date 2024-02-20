import { User } from 'entity/User'

export interface IRegisterUserRepository {
  execute(user: User): Promise<boolean>
}
