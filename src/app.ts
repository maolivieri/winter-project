/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { userRoutes } from './http/controllers/system/user/route'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { roleRoutes } from './http/controllers/system/role/route'
import { permissionRoutes } from './http/controllers/system/permission/route'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifySwagger, {
  mode: 'dynamic'
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(userRoutes)
app.register(roleRoutes)
app.register(permissionRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
