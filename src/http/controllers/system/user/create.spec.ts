import { app } from '@/app'
import request from 'supertest'

describe('create user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response.statusCode).toEqual(201)
  })
})
