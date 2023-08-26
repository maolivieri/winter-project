import { Role, CreateRoleDTO } from '@/entities/system/role'
import { RoleRepository } from '../role-repository'
import { randomUUID } from 'crypto'

export class InMemoryRoleRepository implements RoleRepository {
  public items: Role[] = []

  async list(): Promise<Role[]> {
    return this.items
  };

  async findByName(name: string): Promise<Role | null> {
    const role = this.items.find(role => role.name === name)

    return role ?? null
  };

  async create(data: CreateRoleDTO): Promise<Role> {
    const newRole: Role = {
      id: randomUUID(),
      name: data.name,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.items.push(newRole)

    return newRole
  };
}
