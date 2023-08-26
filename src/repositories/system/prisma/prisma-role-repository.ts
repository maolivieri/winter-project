import { Role, CreateRoleDTO, RoleEntity } from '@/entities/system/role'
import { RoleRepository } from '../role-repository'

export class PrismaRoleRepository implements RoleRepository {
  async list(): Promise<Role[]> {
    return await RoleEntity.findMany()
  }

  async findByName(name: string): Promise<Role | null> {
    return await RoleEntity.findUnique({
      where: {
        name
      }
    })
  }

  async create(data: CreateRoleDTO): Promise<Role> {
    return await RoleEntity.create({
      data
    })
  }
}
