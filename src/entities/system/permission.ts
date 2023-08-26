import { type Permission as _Permission } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export interface Permission extends _Permission {}

export const PermissionEntity = prisma.permission
