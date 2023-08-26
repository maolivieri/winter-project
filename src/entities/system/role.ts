import { type Prisma, type Role as _Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
// import { Optional } from '@/@types/optional'

export interface Role extends _Role {}

export interface CreateRoleDTO extends Prisma.RoleCreateInput {
  permissionsIds: string[]
}

export interface UpdateRoleDTO {
  name: string
}

export const RoleEntity = prisma.role
