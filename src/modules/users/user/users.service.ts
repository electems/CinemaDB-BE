import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { DatabaseService } from '@database/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async findOne(email: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getAll(): Promise<Array<User>> {
    return this.db.user.findMany();
  }

  async create(user: User): Promise<User> {
    return this.db.user.create({
      data: user,
    });
  }

  async getById(id: number): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, user: User): Promise<User> {
    const existingUser = await this.getById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }

    return this.db.user.update({
      where: { id },
      data: user,
    });
  }

  async deleteById(id: number): Promise<User> {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async searchUser(searchWord: string): Promise<any> {
    const result = await this.db.$queryRaw<{ max: number }>(
      Prisma.sql`SELECT * FROM "User" WHERE "firstName" LIKE ${
        '%' + searchWord + '%'
      } 
      or "lastName" LIKE ${'%' + searchWord + '%'} 
      or email LIKE ${'%' + searchWord + '%'} `,
    );
    return result;
  }
}
