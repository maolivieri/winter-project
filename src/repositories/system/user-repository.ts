import { CreateUserDTO, UpdateUserDTO, type User } from '@/entities/system/user'

export interface UpdatePasswordDTO {
  userId: string
  password: string
}

export interface UserRepository {
  create: (user: CreateUserDTO) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  findById: (userId: string) => Promise<User | null>
  update: (data: UpdateUserDTO) => Promise<void>
  updatePasword: (data: UpdatePasswordDTO) => Promise<void>
  listUsers: () => Promise<Array<Omit<User, 'password'>>>
}
