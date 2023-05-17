import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateUseCase } from '@/use-cases/system/user/authenticate'

import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeAuthenticateUseCase()

    const { user, refresh, token } = await registerUseCase.execute({
      email,
      password
    })

    return await reply.status(200).send({
      user: {
        ...user,
        password: undefined
      },
      token,
      refresh
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: err.message })
    }
    if (err instanceof InvalidCredentialsError) {
      return await reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
