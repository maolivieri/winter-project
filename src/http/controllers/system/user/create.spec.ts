import { app } from '@/app'
import request from 'supertest'

vi.mock('@/lib/mail-provider', () => ({
  makeEmailProvider: vi.fn().mockImplementation(() => ({
    execute: () => {}
  }))
}))

describe('create user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a user', async () => {
    const roleResponse = await request(app.server).post('/role').send({
      name: 'admin'
    })

    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role_is: roleResponse.body.role.id
    })

    expect(response.statusCode).toEqual(201)
  })
})
