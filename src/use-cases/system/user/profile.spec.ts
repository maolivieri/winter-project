import { InMemoryUserRepository } from '@/repositories/system/in-memory/in-memory-user-repository'
import { GetUserProfileUseCase } from './profile'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryRefreshTokenRepository } from '@/repositories/system/in-memory/in-memory-refresh-token-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase
let authUseCase: AuthenticateUseCase
let refreshTokenRepository: InMemoryRefreshTokenRepository

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    refreshTokenRepository = new InMemoryRefreshTokenRepository()
    sut = new GetUserProfileUseCase(userRepository)
    authUseCase = new AuthenticateUseCase(userRepository, refreshTokenRepository)
  })

  it('should be able to authenticate a user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'test1@example.com',
      password: '123456',
      role_id: 'testrole'
    })

    const { user } = await authUseCase.execute({
      email: 'test1@example.com',
      password: '123456'
    })

    const authenticatedUser = await sut.execute({ userId: user.id })

    expect(authenticatedUser).toHaveProperty('id')
    expect(authenticatedUser.email).toBe('test1@example.com')
  })

  it('should fail if user id does not exist', async () => {
    await expect(sut.execute({ userId: 'fake-user-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
