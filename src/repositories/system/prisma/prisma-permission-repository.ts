import { Permission, PermissionEntity } from '@/entities/system/permission'
import { PermissionRepository } from '../permission-repository'

export class PrismaPermissionRepository implements PermissionRepository {
  async list(): Promise<Permission[]> {
    return await PermissionEntity.findMany()
  }
}
