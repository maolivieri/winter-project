import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserPermission } from '@/http/middlewares/verify-permissions'

import { list } from './list'

export async function permissionRoutes (app: FastifyInstance): Promise<void> {
  app.get('/permission', { onRequest: [verifyJwt, verifyUserPermission(['list_roles'])] }, list)
}
