import { Permission } from '@/entities/system/permission'

export interface PermissionRepository {
  list: () => Promise<Permission[]>
}
