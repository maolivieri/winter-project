import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '@/use-cases/system/user/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/env'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeAuthenticateUseCase()

    const user = await registerUseCase.execute({
      email,
      password
    })

    const token: string = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '30m'
    })
    const refresh: string = jwt.sign({ sub: user.id }, env.REFRESH_JWT_SECRET, {
      expiresIn: '10d'
    })

    return await reply.status(201).send({
      user,
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
