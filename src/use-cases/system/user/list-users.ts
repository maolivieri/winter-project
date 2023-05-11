import { User } from '@/entities/system/user'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { UserRepository } from '@/repositories/system/user-repository'

interface ListUsersResponse {
  users: User[]
}

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.userRepository.listUsers()

    return {
      users
    }
  }
}

export function makeListUsersUseCase(): ListUsersUseCase {
  const userRepository = new PrismaUserRepository()
  const listUserUseCase = new ListUsersUseCase(userRepository)

  return listUserUseCase
}
