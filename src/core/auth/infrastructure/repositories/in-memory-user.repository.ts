import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/models/user.model';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(u => u.username === username) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) ?? null;
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const user = { id: crypto.randomUUID(), ...userData } as User;
    this.users.push(user);
    return user;
  }
}