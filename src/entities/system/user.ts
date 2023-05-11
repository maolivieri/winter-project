import { type Prisma, type User as _User } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { Optional } from '@/@types/optional'

export interface User extends _User {}

export interface CreateUserDTO extends Prisma.UserCreateInput {}

export interface UpdateUserDTO {
  userId: string
  userInfo: Optional<User, 'password' | 'email'>
}

export const UserEntity = prisma.user
