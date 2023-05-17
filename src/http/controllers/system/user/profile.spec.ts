import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'

describe('get user profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a user', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'testuser@example.com'
      })
    )
  })
})
