import { CreateRoleDTO, Role } from '@/entities/system/role'

export interface RoleRepository {
  list: () => Promise<Role[]>
  findByName: (name: string) => Promise<Role | null>
  create: (data: CreateRoleDTO) => Promise<Role>
}
