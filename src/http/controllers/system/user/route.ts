import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
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
import { verifyUserPermission } from '@/http/middlewares/verify-permissions'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.get('/users', list)
  app.post('/users', create)
  app.patch('/users/:id', update)
  app.patch('/users/:id/disable', disable)
  app.post('/users/reset-password', resetPassword)
  app.post('/users/update-password', updatePassword)
  app.post('/login', authenticate)

  app.post('/token/refresh', refreshToken)

  /** Authenticated */
  app.get('/user/profile', { onRequest: [verifyJwt] }, profile)

  app.get(
    '/test/1',
    { onRequest: [verifyJwt, verifyUserPermission(['create_user', 'edit_user'])] },
    (request: FastifyRequest, reply: FastifyReply) => {
      return reply.status(200).send('TEM ACESSO 1')
    }
  )
}
