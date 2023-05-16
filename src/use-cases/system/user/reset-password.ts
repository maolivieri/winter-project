import { env } from '@/env'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { makeEmailProvider } from '@/lib/mail-provider'
import { resetPasswordEmailTemplate } from '@/lib/mail-provider/templates/reset-password'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'
import { UserRepository } from '@/repositories/system/user-repository'
import jwt from 'jsonwebtoken'

export class ResetPasswordUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const resetPasswordToken: string = jwt.sign({ sub: user.id }, env.RESET_PASSWORD_SECRET, {
      expiresIn: '2d'
    })

    await makeEmailProvider('sendgrid').execute({
      from: 'test@matheusolivieri.me',
      html: resetPasswordEmailTemplate.replace('{{token}}', resetPasswordToken),
      subject: 'Reset Password',
      to: email,
      text: `Please paste this link on the browser ${resetPasswordToken}`
    })
  }
}

export function makeResetPasswordUserUseCase(): ResetPasswordUseCase {
  const usersRepository = new PrismaUserRepository()
  const useCase = new ResetPasswordUseCase(usersRepository)

  return useCase
}
