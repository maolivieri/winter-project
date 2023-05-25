import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CreatePermissionsSeed {
  name: string
  module: string
  domain: string
}

export async function createPermissions(): Promise<void> {
  // GENERAL | USER
  await createPermission({ name: 'create_user', module: 'Users', domain: 'General' })
  await createPermission({ name: 'edit_user', module: 'Users', domain: 'General' })
  await createPermission({ name: 'disable_user', module: 'Users', domain: 'General' })
  await createPermission({ name: 'list_users', module: 'Users', domain: 'General' })
}

async function createPermission({ module, name, domain }: CreatePermissionsSeed): Promise<void> {
  await prisma.permission.upsert({
    where: { name },
    update: {},
    create: {
      name,
      module,
      domain
    }
  })
}
