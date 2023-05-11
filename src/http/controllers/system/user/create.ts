import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/system/user/create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateUserUseCase()

    await registerUseCase.execute({
      name,
      email,
      password
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return await reply.status(201).send()
}
