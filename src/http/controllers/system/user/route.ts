import { FastifyInstance } from 'fastify'
import { create } from './create'

// import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', create)
  //   app.post('/sessions', authenticate)

  //   app.patch('/token/refresh', refresh)

  /** Authenticated */
//   app.get('/me', { onRequest: [verifyJwt] }, profile)
}
