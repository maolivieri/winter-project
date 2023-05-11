import { type Prisma, type User as _User } from '@prisma/client'
import { prisma } from '@/lib/prisma'
// import { Optional } from '@/@types/optional'

export interface User extends _User {}

export interface CreateUserDTO extends Prisma.UserCreateInput {}

export interface UpdateUserDTO {
  userId: string
  userInfo: Omit<Partial<User>, 'id' | 'created_at' | 'email' | 'password'>
}

export const UserEntity = prisma.user
