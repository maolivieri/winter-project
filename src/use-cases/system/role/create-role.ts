import { CreateRoleDTO } from '@/entities/system/role'
import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'
import { PrismaRoleRepository } from '@/repositories/system/prisma/prisma-role-repository'
import { RoleRepository } from '@/repositories/system/role-repository'
import { Role } from '@prisma/client'

export class CreateRoleUseCase {
  constructor (
    private readonly roleRepository: RoleRepository) {}

  async execute ({
    name,
    permissionsIds
  }: CreateRoleDTO): Promise<Role> {
    const existingRole = await this.roleRepository.findByName(name)

    if (existingRole) {
      throw new ResourceAlreadyExistsError('role', 'name')
    }

    const role = await this.roleRepository.create({
      name,
      permissionsIds
    })

    return role
  }
}

export function makeCreateRoleUseCase(): CreateRoleUseCase {
  const roleRepository = new PrismaRoleRepository()
  const createUseCase = new CreateRoleUseCase(roleRepository)

  return createUseCase
}
