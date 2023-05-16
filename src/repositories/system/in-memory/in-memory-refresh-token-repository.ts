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
