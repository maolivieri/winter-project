import { makeListRolesUseCase } from '@/use-cases/system/role/list-roles'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function list(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const listRolesUseCase = makeListRolesUseCase()

  const roles = await listRolesUseCase.execute()

  return await reply.status(200).send(roles)
}
