import { User } from '@/entities/system/user'
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
