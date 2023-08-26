import { app } from '@/app'
import { User } from '@/entities/system/user'
import request from 'supertest'

vi.mock('@/lib/mail-provider', () => ({
  makeEmailProvider: vi.fn().mockImplementation(() => ({
    execute: () => {}
  }))
}))

describe('update user (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all users', async () => {
    const roleResponse = await request(app.server).post('/role').send({
      name: 'admin'
    })

    console.log('####################')
    console.log(JSON.stringify(roleResponse.body))

    const array = [1, 2, 3, 4]

    for await (const n of array) {
      await request(app.server).post('/users').send({
        name: `User ${n}`,
        email: `user${n}@example.com`,
        password: '123456',
        role_is: roleResponse.body.role.id
      })
    }

    const { body } = await request(app.server).get('/users').send()
    const users: User[] = body.users
    const user = users[0]

    const updateRequest = await request(app.server).patch(`/users/${user.id}`).send({
      name: 'new name'
    })

    const allUsersBody = await request(app.server).get('/users').send()
    const allUsers: User[] = allUsersBody.body.users
    const updatedUser = allUsers.find(u => u.id === user.id)

    expect(updateRequest.statusCode).toEqual(200)
    expect(updatedUser).toHaveProperty('name')
    expect(updatedUser).toEqual(expect.objectContaining({
      name: 'new name'
    }))
  })
})
