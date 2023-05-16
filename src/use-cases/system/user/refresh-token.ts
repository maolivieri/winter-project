import jwt from 'jsonwebtoken'

import { env } from '@/env'

import { PrismaRefreshTokenRepository } from '@/repositories/system/prisma/prisma-refresh-token-repositoy'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { RefreshTokenRepository } from '@/repositories/system/refresh-token-repository'

interface RefreshTokenResponse {
  refresh: string
  token: string
}

export class RefreshTokenUseCase {
  constructor (
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute (refreshToken: string): Promise<RefreshTokenResponse> {
    const isTokenValid = jwt.verify(refreshToken, env.REFRESH_JWT_SECRET)
    const databaseToken = await this.refreshTokenRepository.findByTokenId(refreshToken)

    if (!databaseToken || !isTokenValid) {
      throw new InvalidCredentialsError()
    }

    const userId = databaseToken.user_id

    const newToken: string = jwt.sign({ sub: userId }, env.JWT_SECRET, {
      expiresIn: '30m'
    })
    const newRefresh: string = jwt.sign({ sub: userId }, env.REFRESH_JWT_SECRET, {
      expiresIn: '10d'
    })

    await this.refreshTokenRepository.deleteByToken(refreshToken)

    await this.refreshTokenRepository.create({
      token: newRefresh,
      userId
    })

    return {
      token: newToken,
      refresh: newRefresh
    }
  }
}

export function makeRefreshTokenUseCase(): RefreshTokenUseCase {
  const refreshTokenRepository = new PrismaRefreshTokenRepository()
  const createUseCase = new RefreshTokenUseCase(refreshTokenRepository)

  return createUseCase
}
