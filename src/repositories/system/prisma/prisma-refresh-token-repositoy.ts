import { RefreshToken, RefreshTokenEntity } from '@/entities/system/refresh-token'
import { CreateRefreshTokenDTO, RefreshTokenRepository } from '../refresh-token-repository'

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  async create({ userId, token }: CreateRefreshTokenDTO): Promise<void> {
    await RefreshTokenEntity.create({
      data: {
        refresh_token: token,
        user_id: userId
      }
    })
  }

  async listByUserId(userId: string): Promise<RefreshToken[]> {
    const tokens = await RefreshTokenEntity.findMany({
      where: {
        user_id: userId
      }
    })

    return tokens
  }

  async deleteByUserId(userId: string): Promise<void> {
    await RefreshTokenEntity.deleteMany({
      where: {
        user_id: userId
      }
    })
  }

  async deleteByToken(token: string): Promise<void> {
    await RefreshTokenEntity.delete({
      where: {
        refresh_token: token
      }
    })
  }
}
