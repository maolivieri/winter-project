import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { makeDisableUserUseCase } from '@/use-cases/system/user/disable-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function disable(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const paramsSchema = z.object({ id: z.coerce.string() })

  const { id } = paramsSchema.parse(request.params)

  try {
    const updateUseCase = makeDisableUserUseCase()

    await updateUseCase.execute(id)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return await reply.status(200).send()
}
