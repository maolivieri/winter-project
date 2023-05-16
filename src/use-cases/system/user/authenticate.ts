import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { User } from '@/entities/system/user'
import { type UserRepository } from '@/repositories/system/user-repository'

import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { RefreshTokenRepository } from '@/repositories/system/refresh-token-repository'
import { PrismaRefreshTokenRepository } from '@/repositories/system/prisma/prisma-refresh-token-repositoy'

export interface AuthenticateUserDTO {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: User
  token: string
  refresh: string
}

export class AuthenticateUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute ({
    password,
    email
  }: AuthenticateUserDTO): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user?.password) {
      throw new ResourceNotFoundError()
    }

    const verifyPassword = await compare(password, user.password)

    if (!verifyPassword) {
      throw new InvalidCredentialsError()
    }

    const token: string = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '30m'
    })
    const refresh: string = jwt.sign({ sub: user.id }, env.REFRESH_JWT_SECRET, {
      expiresIn: '10d'
    })

    await this.refreshTokenRepository.create({
      token: refresh,
      userId: user.id
    })

    return {
      user,
      token,
      refresh
    }
  }
}

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const usersRepository = new PrismaUserRepository()
  const refreshTokenRepository = new PrismaRefreshTokenRepository()
  const createUseCase = new AuthenticateUseCase(usersRepository, refreshTokenRepository)

  return createUseCase
}
