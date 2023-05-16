import { type User, UserEntity, CreateUserDTO, UpdateUserDTO } from '@/entities/system/user'
import { UpdatePasswordDTO, type UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  async listUsers(): Promise<User[]> {
    return await UserEntity.findMany()
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserEntity.findUnique({
      where: {
        email
      }
    })
  }

  async update({ userId, userInfo }: UpdateUserDTO): Promise<void> {
    await UserEntity.update({
      where: {
        id: userId
      },
      data: userInfo
    })
  }

  async updatePasword({ userId, password }: UpdatePasswordDTO): Promise<void> {
    await UserEntity.update({
      where: {
        id: userId
      },
      data: {
        password
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

  async create (user: CreateUserDTO): Promise<User> {
    return await UserEntity.create({
      data: user
    })
  }
}
