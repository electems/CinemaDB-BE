/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable lines-between-class-members */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';

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

  /*
   *In  this i have casted status and film industry columns from type enum to string
   *coz in DB their types are enum here im passing string to search so i caasted them
   */

  async searchUser(searchWord: string): Promise<any> {
    const result = await this.db.$queryRaw<{ max: number }>(
      Prisma.sql`SELECT * FROM "User" WHERE first_name LIKE ${
        '%' + searchWord + '%'
      } 
      or last_name LIKE ${'%' + searchWord + '%'} 
      or email LIKE ${'%' + searchWord + '%'} or status ::text LIKE ${
        '%' + searchWord + '%'
      } or film_industry ::text LIKE ${'%' + searchWord + '%'} `,
    );
    return result;
  }
  async findOneByUsername(UserName: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        UserName,
      },
    });
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        email,
      },
    });
  }
  async findOneByMobileNumber(PhoneNumber: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        PhoneNumber,
      },
    });
  }
  async generateOTP(emailorphone: string) {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let userData;
    const isEmailValid = this.isEmail(emailorphone);

    if (isEmailValid) {
      userData = await this.findOneByEmail(emailorphone);
    } else if (phoneno.test(emailorphone)) {
      userData = await this.findOneByMobileNumber(emailorphone);
    } else {
      throw new BadRequestException('INCORRECT_FORMAT', {
        cause: new Error(),
        description: 'Email or phone number are not in the correct format',
      });
    }

    if (userData !== undefined) {
      const otp = Math.random().toString().substring(2, 8);
      const saltRounds = 10;
      const hashed = await bcrypt.hash(otp, saltRounds);
      const date = new Date();
      date.setSeconds(date.getSeconds() + 120);
      const user = {
        UserName: emailorphone,
        Password: hashed,
        ElapsedOTPTime: date,
      };
      if (isEmailValid) {
        await this.db.user.update({
          where: { email: emailorphone },
          data: user,
        });
      } else {
        await this.db.user.update({
          where: { PhoneNumber: emailorphone },
          data: user,
        });
      }
    } else {
      throw new BadRequestException('MISSING_USER', {
        cause: new Error(),
        description: 'Not found user object',
      });
    }
  }
  private isEmail(search: string): boolean {
    const regexp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i);
    return regexp.test(search);
  }
}
