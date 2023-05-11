import { makeListUsersUseCase } from '@/use-cases/system/user/list-users'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function list(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const listUsersUseCase = makeListUsersUseCase()

  const users = await listUsersUseCase.execute()

  return await reply.status(201).send(users)
}
