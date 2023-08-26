import jwt from 'jsonwebtoken'
import { InMemoryUserRepository } from '../../../repositories/system/in-memory/in-memory-user-repository'
import { UpdatePasswordUseCase } from './update-password'
import { env } from '@/env'
import { compare } from 'bcryptjs'
import { InMemoryRoleRepository } from '@/repositories/system/in-memory/in-memory-role-repository'

let roleRepository: InMemoryRoleRepository
let userRepository: InMemoryUserRepository
let sut: UpdatePasswordUseCase

describe('User', () => {
  beforeEach(() => {
    roleRepository = new InMemoryRoleRepository()
    userRepository = new InMemoryUserRepository()
    sut = new UpdatePasswordUseCase(userRepository)
  })

  it('should be able to update a user password', async () => {
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
      const resetPasswordTokenMock: string = jwt.sign({ sub: user.id }, env.RESET_PASSWORD_SECRET, {
        expiresIn: '2d'
      })

      await sut.execute({
        token: resetPasswordTokenMock,
        password: 'newpassword'
      })
    }

    const updatedUser = await userRepository.findByEmail('original@email.com')

    const isPasswordValid = updatedUser?.password ? await compare('newpassword', updatedUser.password) : false

    expect(isPasswordValid).toBe(true)
  })
})
