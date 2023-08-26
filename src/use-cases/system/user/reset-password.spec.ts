import { InMemoryUserRepository } from '@/repositories/system/in-memory/in-memory-user-repository'
import { ResetPasswordUseCase } from './reset-password'

let userRepository: InMemoryUserRepository
let sut: ResetPasswordUseCase

const sendEmailMock = vi.fn()
vi.mock('@/lib/mail-provider', () => ({
  makeEmailProvider: vi.fn().mockImplementation(() => ({
    execute: sendEmailMock
  }))
}))

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new ResetPasswordUseCase(userRepository)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should send reset-password email', async () => {
    await userRepository.create({
      email: 'test1@email.com',
      password: '123456',
      name: 'test1',
      role_id: 'testrole'
    })

    sendEmailMock.mockImplementation(() => {})

    await sut.execute('test1@email.com')
    expect(sendEmailMock).toHaveBeenCalled()
  })
})
