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

  async createUser(user: any): Promise<User> {
    const bcryptPassword = await bcrypt.hash(user.password, 11);
    user.password = bcryptPassword;
    if (user.UserSubCategory) {
      return this.db.user.create({
        data: {
          ...user,
          UserSubCategory: {
            create: user.UserSubCategory,
          },
        },
      });
    } else {
      return this.db.user.create({
        data: {
          ...user,
        },
      });
    }
  }

  async getUserById(id: number): Promise<User | null> {
    return this.db
      .$queryRaw`SELECT u.* ,JSONB_agg(JSONB_build_object('id', us."id",'createdAt',
      us."created_at",'updatedAt',us."updated_at",
      'createdBy',us."created_by",'updatedBy',us."updated_by",'key',us."key",
      'value',us."value",'userId',us."user_id")) 
      as UserSubCategory FROM "UserSubCategory" us, 
      "User" u WHERE u.id=${id} AND us.user_id =${id} group by u.id`;
  }

  async updateUser(id: number, user: any): Promise<User> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }
    if (user.UserSubCategory) {
      return this.db.user.update({
        where: { id },
        data: {
          ...user,
          UserSubCategory: {
            create: {
              data: user.UserSubCategory[0],
            },
          },
        },
      });
    } else {
      return this.db.user.update({
        where: { id },
        data: {
          ...user,
        },
      });
    }
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

  async createOne(body: UserSubCategory): Promise<UserSubCategory> {
    const ret = await this.db.userSubCategory.create({
      data: { ...body },
    });
    return ret;
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
    const userSubCategoryIDs = await this.db.userSubCategory.findMany({
      select: {
        id: true,
      },
    });
    console.log(userSubCategoryIDs);
    for (const userSubCategory of userAndUserSubCategory.UserSubCategory) {
      if (userSubCategory.id === undefined) {
        await this.db.userSubCategory.create({
          data: {
            ...userSubCategory,
          },
        });
      }
      else if (userSubCategory.id) {
        await this.db.userSubCategory.update({
          where: { id: userSubCategory.id },
          data: userSubCategory,
        });
      }
    const indexOfId = userSubCategoryIDs.indexOf(userSubCategory.id);
    const removePresentIDs = userSubCategoryIDs.splice(indexOfId, 1)
    console.log(removePresentIDs)
    }

    console.log(userSubCategoryIDs)
      for (const removeIDs of userSubCategoryIDs) {
        await this.db.userSubCategory.deleteMany({
          where: {
            id: {
              equals: removeIDs.id,
            },
          },
        });
        console.log(removeIDs.id);
      } 
    return userAndUserSubCategory;
  }
}
