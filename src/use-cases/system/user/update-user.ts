import { UpdateUserDTO } from '@/entities/system/user'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { UserRepository } from '@/repositories/system/user-repository'

export class UpdateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute({ userId, userInfo }: UpdateUserDTO): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.userRepository.update({ userId, userInfo })
  }
}

export function makeUpdateUserUseCase(): UpdateUserUseCase {
  const usersRepository = new PrismaUserRepository()
  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}
