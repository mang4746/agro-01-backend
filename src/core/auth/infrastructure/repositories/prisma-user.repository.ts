import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/models/user.model';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        person: true,
      },
    });

    if (!user) return null;

    return this.mapToDomain(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        person: true,
      },
    });

    if (!user) return null;

    return this.mapToDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        person: true,
      },
    });

    if (!user) return null;

    return this.mapToDomain(user);
  }

  async create(userData: Omit<User, 'id'> & { personId: string }): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        personId: userData.personId,
        username: userData.username,
        email: userData.email,
        passwordHash: userData.passwordHash,
        status: userData.status,
        userRoles: {
          create: userData.roles.map(roleName => ({
            role: {
              connectOrCreate: {
                where: { name: roleName },
                create: { name: roleName },
              },
            },
          })),
        },
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        person: true,
      },
    });

    return this.mapToDomain(user);
  }

  private mapToDomain(prismaUser: any): User {
    return {
      id: prismaUser.id,
      username: prismaUser.username,
      email: prismaUser.email,
      passwordHash: prismaUser.passwordHash,
      status: prismaUser.status,
      roles: prismaUser.userRoles.map((ur: any) => ur.role.name),
      firstName: prismaUser.person?.firstName,
      lastName: prismaUser.person?.lastName,
    };
  }
}