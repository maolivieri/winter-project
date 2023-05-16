import { env } from '@/env'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { UserRepository } from '@/repositories/system/user-repository'
import { hash } from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface UpdatePasswordDTO {
  token: string
  password: string
}

interface IJWTPayload extends JwtPayload {
  sub: string
}

export class UpdatePasswordUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute({ password, token }: UpdatePasswordDTO): Promise<void> {
    const { sub } = jwt.verify(token, env.RESET_PASSWORD_SECRET) as IJWTPayload

    const user = await this.userRepository.findById(sub)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const passwordHash = await hash(password, 6)
    await this.userRepository.updatePasword({ userId: sub, password: passwordHash })
  }
}

export function makeUpdatePasswordUseCase(): UpdatePasswordUseCase {
  const usersRepository = new PrismaUserRepository()
  const useCase = new UpdatePasswordUseCase(usersRepository)

  return useCase
}
