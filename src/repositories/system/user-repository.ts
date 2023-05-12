import { CreateUserDTO, UpdateUserDTO, type User } from '@/entities/system/user'

export interface UserRepository {
  create: (user: CreateUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (userId: string) => Promise<User | null>
  update: (data: UpdateUserDTO) => Promise<void>
  listUsers: () => Promise<User[]>
}
