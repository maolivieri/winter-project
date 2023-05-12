import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { makeUpdateUserUseCase } from '@/use-cases/system/user/update-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const bodySchema = z.object({ password: z.string(), resetPasswordToken: z.string() })
  const paramsSchema = z.object({ id: z.coerce.string() })

  const { password, resetPasswordToken } = bodySchema.parse(request.body)
  const { id } = paramsSchema.parse(request.params)

  try {
    const updateUseCase = makeUpdateUserUseCase()

    await updateUseCase.execute({
      userId: id,
      userInfo: { name }
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return await reply.status(200).send()
}
