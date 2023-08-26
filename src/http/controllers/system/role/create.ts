import { makeCreateRoleUseCase } from '@/use-cases/system/role/create-role'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const createBodySchema = z.object({
    name: z.string(),
    permissionsIds: z.string().array()
  })

  const { name, permissionsIds } = createBodySchema.parse(request.body)

  const createRoleUseCase = makeCreateRoleUseCase()

  const role = await createRoleUseCase.execute({
    name,
    permissionsIds
  })

  return await reply.status(201).send({
    role
  })
}
