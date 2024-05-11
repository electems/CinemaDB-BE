import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User, UserSubCategory } from '@prisma/client';
import bcrypt from 'bcrypt';

import { DatabaseService } from '@database/database.service';
import { Util } from '@modules/common/util';

interface UserStep {
  step: '';
}
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
    const dbUser = await this.db.user.create({
      data: {
        ...user,
      },
    });

    await this.db.userSubCategory.create({
      data: {
        userId: dbUser.id,
      },
    });
    return dbUser;
  }

  async getUserById(id: number): Promise<any> {
    return this.db
      .$queryRaw`SELECT u.* ,JSONB_agg(JSONB_build_object('id', us."id",'createdAt',
      us."created_at",'updatedAt',us."updated_at",
      'createdBy',us."created_by",'updatedBy',us."updated_by",'key',us."key",
      'value',us."value",'userId',us."user_id")) 
      as userSubCategory FROM "UserSubCategory" us, 
      "User" u WHERE u.id=${id} AND us.user_id =${id} group by u.id`;
  }

  async updateUser(id: number, user: User): Promise<User> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }

    return this.db.user.update({
      where: { id },
      data: {
        ...user,
      },
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

  async getUser(id: number): Promise<User | null> {
    return this.db.user.findFirst({
      where: {
        id,
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
        description: 'Email or phone number is not in the correct format',
      });
    }
    if (userData === null) {
      const user = {
        firstName: emailorphone,
        email: emailorphone,
        phoneNumber: emailorphone,
        password: '',
      };
      userData = await this.db.user.create({
        data: {
          ...user,
        },
      });
    }
    if (userData !== null) {
      const otp = Math.random().toString().substring(2, 8);
      const hashed = await this.util.generatePwd(otp);
      const date = new Date();
      date.setSeconds(date.getSeconds() + 600);
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
        user: {
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email: userData?.email,
        },
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

  async createOneUserSubCategory(
    body: UserSubCategory,
  ): Promise<UserSubCategory> {
    const userSubCategory = await this.db.userSubCategory.create({
      data: body,
    });
    return userSubCategory;
  }

  async getAllUserSubCategory(): Promise<Array<UserSubCategory>> {
    return this.db.userSubCategory.findMany();
  }

  async getUserSubCategoryById(id: number): Promise<UserSubCategory | null> {
    return this.db.userSubCategory.findFirst({
      where: {
        id,
      },
    });
  }

  async updateUserSubCategory(
    id: number,
    user: UserSubCategory,
  ): Promise<UserSubCategory> {
    const existingUser = await this.getUserSubCategoryById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }

    return this.db.userSubCategory.update({
      where: { id },
      data: user,
    });
  }

  async deleteUserSubCategoryById(id: number): Promise<string> {
    const user = await this.getUserSubCategoryById(id);
    if (!user) {
      throw new NotFoundException();
    }

    await this.db.userSubCategory.delete({
      where: {
        id,
      },
    });
    return 'Record Is Deleted Successfully';
  }

  async userAndUserSubCategory(
    userAndUserSubCategory: any,
  ): Promise<UserSubCategory> {
    const updateStep: UserStep = {
      step: userAndUserSubCategory.step,
    };
    await this.db.user.update({
      where: { id: userAndUserSubCategory.id },
      data: updateStep,
    });
    if (userAndUserSubCategory.userSubCategory) {
      for (const userSubCategory of userAndUserSubCategory.userSubCategory) {
        if (userSubCategory.id === undefined) {
          await this.db.userSubCategory.create({
            data: {
              ...userSubCategory,
            },
          });
        } else if (userSubCategory.id) {
          await this.db.userSubCategory.update({
            where: { id: userSubCategory.id },
            data: userSubCategory,
          });
        }
      }
    }

    return userAndUserSubCategory;
  }

  async getUserName(tableId: any): Promise<any> {
    const query = await this.db.$queryRaw<any[]>`SELECT value
    FROM "UserProfessionFormData" u
    INNER JOIN "File" f ON u.id = f.table_fk WHERE f.table_fk = ${tableId}`;
    const value = query[0].value
    return value;
  }

  async getUserProfession(userId: any): Promise<any> {
    const query = await this.db.$queryRaw<any[]>`SELECT value
    FROM "UserSubCategory" u WHERE 
    u.user_id = ${userId}`;
    const value = query[0].value
    return value;
  }
}
