import { app } from '@/app'
import { CreateUserDTO, UserEntity } from '@/entities/system/user'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('authenticate user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate user', async () => {
    const roleResponse = await request(app.server).post('/role').send({
      name: 'admin'
    })

    const newUser: CreateUserDTO = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: await hash('123456', 6),
      role_id: roleResponse.body.role.id
    }

    await UserEntity.create({
      data: newUser
    })

    const response = await request(app.server).post('/login').send({
      email: 'testuser@example.com',
      password: '123456'
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
      refresh: expect.any(String),
      user: expect.objectContaining({
        email: 'testuser@example.com'
      })
    })
  })
})
