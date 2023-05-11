import { app } from '@/app'
import { User } from '@/entities/system/user'
import request from 'supertest'

describe('disable user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to disable a users', async () => {
    const array = [1, 2, 3, 4]

    for await (const n of array) {
      await request(app.server).post('/users').send({
        name: `User ${n}`,
        email: `user${n}@example.com`,
        password: '123456'
      })
    }

    const { body } = await request(app.server).get('/users').send()
    const users: User[] = body.users
    const user = users[0]

    const disableRequest = await request(app.server).patch(`/users/${user.id}/disable`).send()

    const allUsersBody = await request(app.server).get('/users').send()
    const allUsers: User[] = allUsersBody.body.users
    const updatedUser = allUsers.find(u => u.id === user.id)

    expect(disableRequest.statusCode).toEqual(200)
    expect(updatedUser).toHaveProperty('is_active')
    expect(updatedUser).toEqual(expect.objectContaining({
      is_active: false
    }))
  })
})
