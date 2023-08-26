import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserPermission } from '@/http/middlewares/verify-permissions'

import { list } from './list'
import { create } from './create'

export async function roleRoutes (app: FastifyInstance): Promise<void> {
  app.get('/role', { onRequest: [verifyJwt, verifyUserPermission(['list_roles'])] }, list)
  app.post('/role', { onRequest: [verifyJwt, verifyUserPermission(['create_role'])] }, create)
  // app.patch('/role/:id', { onRequest: [verifyJwt, verifyUserPermission(['create_user', 'edit_user'])] }, update)
  // app.patch('/role/:id/permissions', { onRequest: [verifyJwt, verifyUserPermission(['create_user', 'edit_user'])] }, update)
}
