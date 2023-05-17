import { CreateUserDTO, UserEntity } from '@/entities/system/user'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface Response {
  token: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance
): Promise<Response> {
  const newUser: CreateUserDTO = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: await hash('123456', 6)
  }

  await UserEntity.create({
    data: newUser
  })

  const authResponse = await request(app.server).post('/login').send({
    email: 'testuser@example.com',
    password: '123456'
  })

  const { token } = authResponse.body

  return {
    token
  }
}
