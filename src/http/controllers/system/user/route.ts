import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { list } from './list'
import { disable } from './disable'
import { resetPassword } from './reset-password'
import { updatePassword } from './update-password'
import { authenticate } from './authenticate'
import { refreshToken } from './refresh-token'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.get('/users', list)
  app.post('/users', create)
  app.patch('/users/:id', update)
  app.patch('/users/:id/disable', disable)
  app.post('/users/reset-password', resetPassword)
  app.post('/users/update-password', updatePassword)
  app.post('/login', authenticate)

  app.patch('/token/refresh', refreshToken)

  /** Authenticated */
  app.get('/user/profile', { onRequest: [verifyJwt] }, profile)
}
