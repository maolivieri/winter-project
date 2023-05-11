import { app } from '@/app'
import request from 'supertest'

describe('list users (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all users', async () => {
    const array = [1, 2, 3, 4]

    for await (const n of array) {
      await request(app.server).post('/users').send({
        name: `User ${n}`,
        email: `user${n}@example.com`,
        password: '123456'
      })
    }

    const response = await request(app.server).get('/users').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('users')
    expect(response.body).toEqual(expect.objectContaining({
      users: expect.arrayContaining([expect.objectContaining({
        name: 'User 3',
        email: 'user3@example.com'
      })])
    }))
  })
})
