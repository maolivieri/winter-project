import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { makeUpdatePasswordUseCase } from '@/use-cases/system/user/update-password'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updatePassword(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const bodySchema = z.object({ password: z.string(), token: z.string() })

  const { password, token } = bodySchema.parse(request.body)

  try {
    const useCase = makeUpdatePasswordUseCase()

    await useCase.execute({
      token,
      password
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return await reply.status(200).send()
}
