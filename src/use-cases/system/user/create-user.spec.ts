import { InMemoryUserRepository } from '../../../repositories/system/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('should be able to create a user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const user = userRepository.items.find(user => user.name === 'John Doe')

    expect(user).toHaveProperty('id')
  })
})
