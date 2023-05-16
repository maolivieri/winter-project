import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeEmailProvider } from '@/lib/mail-provider'
import { makeCreateUserUseCase } from '@/use-cases/system/user/create-user'
import { welcomeEmailTemplate } from '@/lib/mail-provider/templates/welcome'

export async function create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).optional()
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateUserUseCase()

    const user = await registerUseCase.execute({
      name,
      email,
      password
    })

    const setPasswordToken: string = jwt.sign({ sub: user.id }, env.RESET_PASSWORD_SECRET, {
      expiresIn: '2d'
    })

    await makeEmailProvider('sendgrid').execute({
      from: 'test@matheusolivieri.me',
      html: welcomeEmailTemplate.replace('{{token}}', setPasswordToken),
      subject: 'Welcome to Winter Project app',
      to: email,
      text: `Please past this link on the browser ${setPasswordToken}`
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return await reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return await reply.status(201).send()
}
