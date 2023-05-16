import { compare } from 'bcryptjs'

import { User } from '@/entities/system/user'
import { type UserRepository } from '@/repositories/system/user-repository'

import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'

export interface AuthenticateUserDTO {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor (
    private readonly userRepository: UserRepository) {}

  async execute ({
    password,
    email
  }: AuthenticateUserDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    if (!user?.password) {
      throw new ResourceNotFoundError()
    }

    const verifyPassword = await compare(password, user.password)

    if (!verifyPassword) {
      throw new InvalidCredentialsError()
    }
    return user
  }
}

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const usersRepository = new PrismaUserRepository()
  const createUseCase = new AuthenticateUseCase(usersRepository)

  return createUseCase
}
