import { hash } from 'bcryptjs'

import { User, type CreateUserDTO } from '@/entities/system/user'
import { type UserRepository } from '@/repositories/system/user-repository'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { PrismaUserRepository } from '@/repositories/system/prisma/prisma-user-repositoy'

export class CreateUserUseCase {
  constructor (
    private readonly userRepository: UserRepository) {}

  async execute ({
    email,
    password,
    name,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    role_id
  }: CreateUserDTO): Promise<User> {
    const passwordHash = password ? await hash(password, 6) : null

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      email,
      name,
      password: passwordHash,
      role_id
    })

    return user
  }
}

export function makeCreateUserUseCase(): CreateUserUseCase {
  const usersRepository = new PrismaUserRepository()
  const createUseCase = new CreateUserUseCase(usersRepository)

  return createUseCase
}
