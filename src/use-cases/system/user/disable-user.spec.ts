import { InMemoryUserRepository } from '../../../repositories/system/in-memory/in-memory-user-repository'
import { DisableUserUseCase } from './disable-user'

let userRepository: InMemoryUserRepository
let sut: DisableUserUseCase

describe('User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new DisableUserUseCase(userRepository)
  })

  it('should be able to disable a user', async () => {
    await userRepository.create({
      email: 'original@email.com',
      password: 'initpassword',
      name: 'original'
    })

    const user = await userRepository.findByEmail('original@email.com')

    if (user) {
      await sut.execute(user.id)
    }

    const updatedUser = await userRepository.findByEmail('original@email.com')

    expect(updatedUser?.is_active).toBe(false)
  })
})
