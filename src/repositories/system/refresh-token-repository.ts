import { RefreshToken } from '@/entities/system/refresh-token'

export interface CreateRefreshTokenDTO {
  userId: string
  token: string
}

export interface RefreshTokenRepository {
  create: (data: CreateRefreshTokenDTO) => Promise<void>
  listByUserId: (userId: string) => Promise<RefreshToken[]>
  deleteByUserId: (userId: string) => Promise<void>
  deleteByToken: (token: string) => Promise<void>
}
