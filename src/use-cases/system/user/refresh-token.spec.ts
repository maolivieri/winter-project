import { InMemoryRefreshTokenRepository } from '@/repositories/system/in-memory/in-memory-refresh-token-repository'
import { RefreshTokenUseCase } from './refresh-token'
import { InMemoryUserRepository } from '@/repositories/system/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'

let userRepository: InMemoryUserRepository
let refreshTokenRepository: InMemoryRefreshTokenRepository
let authenticateUseCase: AuthenticateUseCase
let sut: RefreshTokenUseCase

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    refreshTokenRepository = new InMemoryRefreshTokenRepository()
    sut = new RefreshTokenUseCase(refreshTokenRepository)
    authenticateUseCase = new AuthenticateUseCase(userRepository, refreshTokenRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should be able to verify refresh token, delete and save a new refresh token', async () => {
    await userRepository.create({
      email: 'original@email.com',
      password: 'initpassword',
      name: 'original',
      role_id: 'testrole'
    })

    // authenticate user to get tokens
    const authRespose = await authenticateUseCase.execute({
      email: 'original@email.com',
      password: 'initpassword'
    })

    vi.advanceTimersByTime(60 * 60 * 10)

    const { refresh, token } = await sut.execute(authRespose.refresh)

    expect(refresh).toEqual(expect.any(String))
    expect(token).toEqual(expect.any(String))
    expect(refresh).not.toEqual(authRespose.refresh)
  })
})
