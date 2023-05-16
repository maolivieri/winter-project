import { RefreshToken } from '@/entities/system/refresh-token'
import { CreateRefreshTokenDTO, RefreshTokenRepository } from '../refresh-token-repository'

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  public tokens: RefreshToken[] = []

  async create({ token, userId }: CreateRefreshTokenDTO): Promise<void> {
    this.tokens.push({
      refresh_token: token,
      user_id: userId
    })
  }

  async findByTokenId(token: string): Promise<RefreshToken | null> {
    const refreshToken = this.tokens.find(item => item.refresh_token === token) ?? null

    return refreshToken
  }

  async listByUserId(userId: string): Promise<RefreshToken[]> {
    return this.tokens.filter(token => token.user_id === userId)
  }

  async deleteByUserId(userId: string): Promise<void> {
    this.tokens = this.tokens.filter(token => token.user_id !== userId)
  }

  async deleteByToken(token: string): Promise<void> {
    this.tokens = this.tokens.filter(item => item.refresh_token !== token)
  }
}
