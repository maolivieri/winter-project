import { makeListPermissionsUseCase } from '@/use-cases/system/permission/list-permissions'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function list(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const listPermissionsUseCase = makeListPermissionsUseCase()

  const roles = await listPermissionsUseCase.execute()

  return await reply.status(200).send(roles)
}
