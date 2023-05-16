import { type UserRefreshToken as _RefreshToken } from '@prisma/client'
import { prisma } from '@/lib/prisma'
// import { Optional } from '@/@types/optional'

export interface RefreshToken extends _RefreshToken {}

export const RefreshTokenEntity = prisma.userRefreshToken
