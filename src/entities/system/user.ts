import { type Prisma, type User as _User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export interface User extends _User {}

export interface CreateUserDTO extends Prisma.UserCreateInput {}

export const UserEntity = prisma.user
