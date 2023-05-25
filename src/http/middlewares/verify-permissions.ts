import { UserEntity } from '@/entities/system/user'
import { FastifyReply, FastifyRequest, DoneFuncWithErrOrRes } from 'fastify'

export function verifyUserPermission(requiredPermissions: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const { sub } = request.user

    const user = await UserEntity.findUnique({
      where: {
        id: sub
      },
      include: {
        role: {
          include: {
            permissions: {
              select: {
                permission: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!user) {
      return await reply.status(401).send({ message: 'Not allowed.' })
    }

    const { role } = user
    const { permissions } = role
    const userPermissions = permissions.flatMap(p => p.permission.name)

    const hasPermission: boolean = requiredPermissions.every(p => userPermissions.includes(p))

    if (!hasPermission) {
      return await reply.status(401).send({ message: 'Not allowed.' })
    }

    done()
  }
}
