import { InMemoryUserRepository } from '@/repositories/system/in-memory/in-memory-user-repository'
import { ListUsersUseCase } from './list-users'

let userRepository: InMemoryUserRepository
let sut: ListUsersUseCase

describe('Users', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new ListUsersUseCase(userRepository)
  })

  it('should be able to list all users', async () => {
    await userRepository.create({
      email: 'test1@email.com',
      password: '123456',
      name: 'test1'
    })

    await userRepository.create({
      email: 'test2@email.com',
      password: '123456',
      name: 'test2'
    })

    const response = await sut.execute()

    expect(response).toHaveProperty('users')
    expect(response.users).toHaveLength(2)
    expect(response.users).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: 'test1@email.com'
      }),
      expect.objectContaining({
        email: 'test2@email.com'
      })
    ]))
  })
})
