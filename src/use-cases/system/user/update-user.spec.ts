import { InMemoryRoleRepository } from '@/repositories/system/in-memory/in-memory-role-repository'
import { InMemoryUserRepository } from '../../../repositories/system/in-memory/in-memory-user-repository'
import { UpdateUserUseCase } from './update-user'

let roleRepository: InMemoryRoleRepository
let userRepository: InMemoryUserRepository
let sut: UpdateUserUseCase

describe('User', () => {
  beforeEach(() => {
    roleRepository = new InMemoryRoleRepository()
    userRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(userRepository)
  })

  it('should be able to update a user', async () => {
    const role = await roleRepository.create({
      name: 'testrole'
    })

    await userRepository.create({
      email: 'original@email.com',
      password: 'initpassword',
      name: 'original',
      role_id: role.id
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
