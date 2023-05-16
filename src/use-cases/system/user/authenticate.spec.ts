import { InMemoryUserRepository } from '@/repositories/system/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate a user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'test1@example.com',
      password: '123456'
    })

    const user = await sut.execute({
      email: 'test1@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'test1@example.com',
      password: '123456'
    })

    await expect(sut.execute({
      email: 'test1@example.com',
      password: 'wrongpassword'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
