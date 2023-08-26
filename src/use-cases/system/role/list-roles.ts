import { Role } from '@/entities/system/role'
import { PrismaRoleRepository } from '@/repositories/system/prisma/prisma-role-repository'
import { RoleRepository } from '@/repositories/system/role-repository'

export class ListRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<Role[]> {
    return await this.roleRepository.list()
  }
}

export function makeListRolesUseCase(): ListRolesUseCase {
  const roleRepository = new PrismaRoleRepository()
  const listRolesUseCase = new ListRolesUseCase(roleRepository)

  return listRolesUseCase
}
