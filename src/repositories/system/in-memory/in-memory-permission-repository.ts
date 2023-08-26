import { permissionsSeed } from 'shared/seed/permissions'
import { PermissionRepository } from '../permission-repository'
import { Permission } from '@/entities/system/permission'

export class InMemoryPermissionRepository implements PermissionRepository {
  public permissions: Permission[] = permissionsSeed.map((permission, idx) => ({
    ...permission,
    id: `id-${idx}`
  }))

  async list(): Promise<Permission[]> {
    return this.permissions
  }
}
