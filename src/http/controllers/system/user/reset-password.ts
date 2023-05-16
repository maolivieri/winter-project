import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { makeResetPasswordUserUseCase } from '@/use-cases/system/user/reset-password'

export async function resetPassword(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const paramsSchema = z.object({ email: z.coerce.string() })

  const { email } = paramsSchema.parse(request.params)

  try {
    const useCase = makeResetPasswordUserUseCase()

    await useCase.execute(email)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return await reply.status(200).send()
}
