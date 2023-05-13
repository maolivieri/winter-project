import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User, type CreateUserDTO } from '@/entities/system/user'
import { type UserRepository } from '@/repositories/system/user-repository'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { makeEmailProvider } from '@/lib/mail-provider'

import { welcomeEmailTemplate } from '@/lib/mail-provider/templates/welcome'
import { env } from '@/env'

export class CreateUserUseCase {
  constructor (
    private readonly userRepository: UserRepository) {}

  async execute ({
    email,
    password,
    name
  }: CreateUserDTO): Promise<User> {
    const passwordHash = password ? await hash(password, 6) : null

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      email,
      name,
      password: passwordHash
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

    return user
  }
}

export function makeCreateUserUseCase(): CreateUserUseCase {
  const usersRepository = new PrismaUserRepository()
  const createUseCase = new CreateUserUseCase(usersRepository)

  return createUseCase
}
