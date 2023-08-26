import { PermissionEntity } from '@/entities/system/permission'
import { RoleEntity } from '@/entities/system/role'
import { CreateUserDTO, UserEntity } from '@/entities/system/user'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { permissionsSeed } from 'shared/seed/permissions'
import request from 'supertest'

interface Response {
  token: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance
): Promise<Response> {
  await PermissionEntity.createMany({
    data: permissionsSeed
  })

  const permissions = await PermissionEntity.findMany()

  const roleWithoutPermissions = await RoleEntity.create({
    data: {
      name: 'testRole'
    }
  })

  const role = await RoleEntity.update({
    where: {
      id: roleWithoutPermissions.id
    },
    data: {
      permissions: {
        connect: permissions.map(permission => ({
          permission_id_role_id: {
            permission_id: permission.id,
            role_id: roleWithoutPermissions.id
          }
        }))
      }
    }
  })

  const newUser: CreateUserDTO = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: await hash('123456', 6),
    role_id: role.id
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
