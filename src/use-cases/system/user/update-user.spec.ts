import { InMemoryUserRepository } from '../../../repositories/system/in-memory/in-memory-user-repository'
import { UpdateUserUseCase } from './update-user'

let userRepository: InMemoryUserRepository
let sut: UpdateUserUseCase

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(userRepository)
  })

  it('should be able to update a user', async () => {
    await userRepository.create({
      email: 'original@email.com',
      password: 'initpassword',
      name: 'original'
    })

    const user = await userRepository.findByEmail('original@email.com')

    if (user) {
      await sut.execute({
        userId: user?.id,
        userInfo: {
          name: 'newName'
        }
      })
    }

    const updatedUser = await userRepository.findByEmail('original@email.com')

    expect(updatedUser?.name).toBe('newName')
  })
})
