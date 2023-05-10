import { type CreateUserDTO } from '@/entities/system/user'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { type UserRepository } from '@/repositories/system/user-repository'
import { hash } from 'bcryptjs'

export class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute ({
    email,
    password,
    name
  }: CreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail != null) {
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      email,
      name,
      password: passwordHash
    })
  }
}
