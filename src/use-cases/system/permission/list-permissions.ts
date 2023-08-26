import { Permission } from '@/entities/system/permission'
import { PermissionRepository } from '@/repositories/system/permission-repository'
import { PrismaPermissionRepository } from '@/repositories/system/prisma/prisma-permission-repository'

export class ListPermissionsUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(): Promise<Permission[]> {
    return await this.permissionRepository.list()
  }
}

export function makeListPermissionsUseCase(): ListPermissionsUseCase {
  const permissionRepository = new PrismaPermissionRepository()
  const listPermissionsUseCase = new ListPermissionsUseCase(permissionRepository)

  return listPermissionsUseCase
}
