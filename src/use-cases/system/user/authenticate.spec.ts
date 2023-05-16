import { InMemoryUserRepository } from '@/repositories/system/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '@/errors/invalid-credentials'
import { InMemoryRefreshTokenRepository } from '@/repositories/system/in-memory/in-memory-refresh-token-repository'

let userRepository: InMemoryUserRepository
let refreshTokenRepository: InMemoryRefreshTokenRepository
let sut: AuthenticateUseCase

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    refreshTokenRepository = new InMemoryRefreshTokenRepository()
    sut = new AuthenticateUseCase(userRepository, refreshTokenRepository)
  })

  it('should be able to authenticate a user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'test1@example.com',
      password: '123456'
    })

    const { user, refresh, token } = await sut.execute({
      email: 'test1@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    expect(refresh).toEqual(expect.any(String))
    expect(token).toEqual(expect.any(String))
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
