import { Injectable } from '@nestjs/common';
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
  ) {}

  async validateUser(userName: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneUser(userName);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    if (user.role !== 'ADMIN') {
      if (user.elapsedOTPTime > new Date()) {
        return user;
      }
      return null;
    }

    return user;
  }

  async getLoggedUser(user: any): Promise<LoggedUserDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      step: user.step,
      industrySelection: user.industrySelection,
      userSubCategory: user.userSubCategory,
    };

    const userAndUserSubCategory = await this.usersService.getUserById(user.id);

    const returnObject = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: this.jwtService.sign(payload),
      role: user.role,
      step: user.step,
      industrySelection: user.industrySelection,
      userSubCategory: userAndUserSubCategory[0].usersubcategory,
    };

    return returnObject;
  }
}
