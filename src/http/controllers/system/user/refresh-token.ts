import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeRefreshTokenUseCase } from '@/use-cases/system/user/refresh-token'

export async function refreshToken(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({ refreshToken: z.string() })

  const { refreshToken } = registerBodySchema.parse(request.body)

  try {
    const useCase = makeRefreshTokenUseCase()

    const { refresh, token } = await useCase.execute(refreshToken)

    return await reply.status(201).send({
      refresh,
      token
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
