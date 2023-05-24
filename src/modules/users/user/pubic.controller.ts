import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  BadRequestException,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

import { ApiRoute } from '@decorators/api-route';

import { LoggedUserDto } from './dto/logged-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.auth-guard';

@Controller('auth')
@ApiTags('auth-users')
export class PublicController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ description: 'The user credentials', type: LoginDto })
  @ApiRoute({
    summary: 'Login route',
    description: 'The login route',
    created: { type: LoggedUserDto, description: 'Authentication succeeded' },
  })
  async login(
    @Request() req: ExpressRequest & { user: LoggedUserDto },
  ): Promise<LoggedUserDto> {
    return this.authService.getLoggedUser(req.user);
  }

  @Get('otp/:emailorphone')
  async sentOTP(
    @Param('emailorphone') emailorphone: string,
  ): Promise<User | null> {
    if (emailorphone === undefined) {
      throw new BadRequestException('MISSING_REQUIRED_FIELD', {
        cause: new Error(),
        description: 'Email or phone number is required',
      });
    }
    return this.userService.generateOTP(emailorphone);
  }

  @Post('createuser')
  @ApiRoute({
    summary: 'Create a user',
    description: 'Creates a new user',
    badRequest: {},
  })
  async createUser(@Body() newUser: User): Promise<User> {
    return this.userService.createUser(newUser);
  }
}
