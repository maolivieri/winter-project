import { CreateUserDTO, type User } from '@/entities/system/user'

export interface UserRepository {
  create: (user: CreateUserDTO) => Promise<void>
  findByEmail: (email: string) => Promise<User | null>
  findById: (userId: string) => Promise<User | null>
}
