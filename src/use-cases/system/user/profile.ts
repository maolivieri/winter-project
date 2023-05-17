import { User } from '@/entities/system/user'
import { type UserRepository } from '@/repositories/system/user-repository'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

export class GetUserProfileUseCase {
  constructor (
    private readonly userRepository: UserRepository) {}

  async execute ({
    userId
  }: { userId: string }): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
  const usersRepository = new PrismaUserRepository()
  const createUseCase = new GetUserProfileUseCase(usersRepository)

  return createUseCase
}
