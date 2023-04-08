/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable lines-between-class-members */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

import { ApiRoute } from '@decorators/api-route';

import { LoggedUserDto } from './dto/logged-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtPayloadDto } from '../auth/dto/jwt.payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth-guard';
import { LocalAuthGuard } from '../auth/guards/local.auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('auth-users')
@ApiBearerAuth()
export class UsersController {
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
    @Request() req: ExpressRequest & { user: User },
  ): Promise<LoggedUserDto> {
    return this.authService.getLoggedUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiRoute({
    summary: 'Logged user profile',
    description:
      'Retrieves the logged user profile from the jwt bearer token provided',
    ok: { description: 'Logged user profile', type: JwtPayloadDto },
  })
  getProfile(
    @Request() req: ExpressRequest & { user: JwtPayloadDto },
  ): JwtPayloadDto {
    return req.user;
  }

  @Get()
  @ApiRoute({
    summary: 'Get all users',
    description: 'Retrieves all the users',
  })
  async getAllUsers(): Promise<Array<User>> {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getUser(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User | null> {
    return this.userService.getById(id);
  }

  @Post('createuser')
  @ApiRoute({
    summary: 'Create a user',
    description: 'Creates a new user',
    badRequest: {},
  })
  async createUser(@Body() newUser: User): Promise<User> {
    return this.userService.create(newUser);
  }

  @Put('updateuser/:id')
  @ApiRoute({
    summary: 'Update a User',
    description: 'Modifies a User',
    notFound: { description: "The requested User wasn't found" },
    badRequest: {},
  })
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() user: User,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete('delete/:id')
  @ApiRoute({
    summary: 'Delete a User',
    description: 'Removes a User',
    notFound: { description: "The requested User wasn't found" },
  })
  async deleteUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.deleteById(id);
  }

  @Get('search/:searchWord')
  async getAuthors(@Param('searchWord') searchWord: string): Promise<User[]> {
    return this.userService.searchUser(searchWord);
  }

  @Get('otp/:emailorphone')
  async sentOTP(@Param('emailorphone') emailorphone: string) {
    if (emailorphone === undefined) {
      throw new BadRequestException('MISSING_REQUIRED_FIELD', {
        cause: new Error(),
        description: 'Email or phone number is required',
      });
    }

    return this.userService.generateOTP(emailorphone);
  }
}
