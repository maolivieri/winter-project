import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUserRepository } from '../../../repositories/system/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

vi.mock('../../../lib/mail-provider/mail-provider.ts', () => ({
  execute: vi.fn()
}))

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should be able to create a user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const user = await userRepository.findByEmail('johndoe@example.com')

    expect(user).toHaveProperty('id')
  })

  it('should not create a user with an existing email address', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'test1@example.com',
      password: '123456'
    })

    await expect(sut.execute({
      name: 'Test2',
      email: 'test1@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
