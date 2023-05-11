import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { UserRepository } from '@/repositories/system/user-repository'

export class DisableUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userInfo = {
      is_active: false
    }

    await this.userRepository.update({ userId, userInfo })
  }
}

export function makeDisableUserUseCase(): DisableUserUseCase {
  const usersRepository = new PrismaUserRepository()
  const useCase = new DisableUserUseCase(usersRepository)

  return useCase
}
