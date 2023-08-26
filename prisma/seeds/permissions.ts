import { PrismaClient } from '@prisma/client'
import { permissionsSeed } from 'shared/seed/permissions'
const prisma = new PrismaClient()

interface CreatePermissionsSeed {
  name: string
  module: string
  domain: string
}

export async function createPermissions(): Promise<void> {
  for await (const { name, domain, module } of permissionsSeed) {
    await createPermission({ name, module, domain })
  }
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
