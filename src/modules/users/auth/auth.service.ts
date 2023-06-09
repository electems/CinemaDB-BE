import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { LoggedUserDto } from '../user/dto/logged-user.dto';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(userName: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneUser(userName);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Password Wrong', {
        cause: new Error(),
        description: 'Enter Correct Otp',
      });
    }

    if (user.role !== 'ADMIN' && user.role !== 'PENMAN') {
      if (user.elapsedOTPTime > new Date()) {
        return user;
      }
      throw new BadRequestException('OTP Expired', {
        cause: new Error(),
        description: 'Your OTP has expired',
      });
    }

    return user;
  }

  async getLoggedUser(user: any): Promise<LoggedUserDto> {
    let returnObject: LoggedUserDto = {
      id: user.id,
      email: '',
      firstName: '',
      lastName: '',
      token: '',
      role: '',
      step: '',
      industrySelection: [],
      userSubCategory: [],
      userName: '',
      planId: user.planId,
    };
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      role: user.role,
      step: user.step,
      industrySelection: user.industrySelection,
      userSubCategory: user.userSubCategory,
    };

    const userAndUserSubCategory = await this.usersService.getUserById(user.id);

    if (userAndUserSubCategory.length === 0) {
      returnObject = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: this.jwtService.sign(payload),
        role: user.role,
        userName: user.userName,
        step: user.step,
        industrySelection: user.industrySelection,
        userSubCategory: [],
        planId: user.planId,
      };
    } else {
      returnObject = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: this.jwtService.sign(payload),
        role: user.role,
        step: user.step,
        userName: user.userName,
        industrySelection: user.industrySelection,
        userSubCategory: userAndUserSubCategory[0].usersubcategory,
        planId: user.planId,
      };
    }
    return returnObject;
  }
}
