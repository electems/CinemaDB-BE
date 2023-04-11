import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { DatabaseService } from '@database/database.service';
import { Util } from '@modules/common/util';

@Injectable()
export class UsersService {
  constructor(
    private db: DatabaseService,
    private eventEmitter: EventEmitter2,
    private util: Util,
  ) {}

  async findOneUser(userName: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        AND: [
          {
            userName: {
              equals: userName,
            },
          },
          {
            status: {
              equals: 'ACTIVE',
            },
          },
        ],
      },
    });
  }

  async getAllUsers(): Promise<Array<User>> {
    return this.db.user.findMany();
  }

  async createUser(user: User): Promise<User> {
    const bcryptPassword = await bcrypt.hash(user.password, 11);
    user.password = bcryptPassword;
    return this.db.user.create({
      data: user,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, user: User): Promise<User> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }

    return this.db.user.update({
      where: { id },
      data: user,
    });
  }

  async deleteUserById(id: number): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async searchUser(searchWord: string): Promise<User[]> {
    const users = await this.db.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchWord,
            },
          },
          {
            lastName: {
              contains: searchWord,
            },
          },
          {
            email: {
              contains: searchWord,
            },
          },
          {
            filmIndustry: {
              contains: searchWord,
            },
          },
          {
            status: {
              contains: searchWord,
            },
          },
        ],
      },
    });
    return users;
  }

  async findOneUserByUsername(userName: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        userName,
      },
    });
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findOneUserByMobileNumber(phoneNumber: string): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        phoneNumber,
      },
    });
  }

  async generateOTP(emailorphone: string): Promise<User | null> {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let userData = undefined;
    let updatedUserData;
    const isEmailValid = this.util.isEmail(emailorphone);

    if (isEmailValid) {
      userData = await this.findOneUserByEmail(emailorphone);
    } else if (phoneno.test(emailorphone)) {
      userData = await this.findOneUserByMobileNumber(emailorphone);
    } else {
      throw new BadRequestException('INCORRECT_FORMAT', {
        cause: new Error(),
        description: 'Email or phone number are not in the correct format',
      });
    }

    if (userData !== null) {
      const otp = Math.random().toString().substring(2, 8);
      const hashed = await this.util.generatePwd(otp);
      const date = new Date();
      date.setSeconds(date.getSeconds() + 120);
      const user = {
        userName: emailorphone,
        password: hashed,
        elapsedOTPTime: date,
      };
      if (isEmailValid) {
        updatedUserData = await this.db.user.update({
          where: { email: emailorphone },
          data: {
            userName: emailorphone,
            elapsedOTPTime: date,
            password: hashed,
          },
        });
      } else {
        updatedUserData = await this.db.user.update({
          where: { phoneNumber: emailorphone },
          data: user,
        });
      }
      this.eventEmitter.emit('email.registration', {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        otp,
      });
    } else {
      throw new BadRequestException('MISSING_USER', {
        cause: new Error(),
        description: 'Not found user object',
      });
    }

    return updatedUserData;
  }
}
