import { type User, UserEntity, CreateUserDTO } from '@/entities/system/user'
import { type UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  async findByEmail (email: string): Promise<User | null> {
    return await UserEntity.findUnique({
      where: {
        email
      }
    })
  }

  async findById (userId: string): Promise<User | null> {
    return await UserEntity.findUnique({
      where: {
        id: userId
      }
    })
  }

  async create (user: CreateUserDTO): Promise<void> {
    await UserEntity.create({
      data: user
    })
  }
}
