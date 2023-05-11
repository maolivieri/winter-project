import { CreateUserDTO, UpdateUserDTO, User } from '@/entities/system/user'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async listUsers(): Promise<User[]> {
    return this.users
  }

  async create(user: CreateUserDTO): Promise<void> {
    const newUser = {
      id: randomUUID(),
      name: user.name ?? null,
      email: user.email,
      password: user.password,
      created_at: new Date()
    }

    if (newUser) {
      this.users.push(newUser)
    }
  }

  async update({ userId, userInfo }: UpdateUserDTO): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === userId)

    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...userInfo }
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
