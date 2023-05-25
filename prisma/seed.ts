import { PrismaClient } from '@prisma/client'
import { createPermissions } from './seeds/permissions'
const prisma = new PrismaClient()
async function main(): Promise<void> {
  await createPermissions()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
