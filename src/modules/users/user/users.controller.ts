import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserSubCategory } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

import { ApiRoute } from '@decorators/api-route';

import { UsersService } from './users.service';
import { JwtPayloadDto } from '../auth/dto/jwt.payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth-guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
@ApiTags('auth-users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
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
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getUser(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User | null> {
    return this.userService.getUserById(id);
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
    return this.userService.updateUser(id, user);
  }

  @Delete('delete/:id')
  @ApiRoute({
    summary: 'Delete a User',
    description: 'Removes a User',
    notFound: { description: "The requested User wasn't found" },
  })
  async deleteUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.deleteUserById(id);
  }

  @Get('userSubCategory/all')
  @ApiRoute({
    summary: 'Get All UserSubCategory',
    description: 'Retrieves  UserSubCategory',
  })
  async getAllUserSubCategory(): Promise<Array<UserSubCategory>> {
    return this.userService.getAllUserSubCategory();
  }

  @Get('userSubCategory/:id')
  @ApiRoute({
    summary: 'Get UserSubCategory',
    description: 'Retrieves  UserSubCategory',
  })
  async getUserSubCategoryById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<UserSubCategory | null> {
    return this.userService.getUserSubCategoryById(id);
  }

  @Post('createuser')
  @ApiRoute({
    summary: 'Create a UserSubCategory',
    description: 'Creates a new UserSubCategory',
    badRequest: {},
  })
  async createUserSubCategory(@Body() newUserSubCategory: UserSubCategory): Promise<UserSubCategory> {
    return this.userService.createUserSubCategory(newUserSubCategory);
  }

  @Put('updateUserSubCategory/:id')
  @ApiRoute({
    summary: 'Update a UserSubCategory',
    description: 'Modifies a UserSubCategory',
    notFound: { description: "The requested UserSubCategory wasn't found" },
    badRequest: {},
  })
  async updateUserSubCategory(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userSubCategory: UserSubCategory,
  ): Promise<UserSubCategory> {
    return this.userService.updateUserSubCategory(id, userSubCategory);
  }

  @Delete('deleteUserSubCategory/:id')
  @ApiRoute({
    summary: 'Delete a UserSubCategory',
    description: 'Removes a UserSubCategory',
    notFound: { description: "The requested UserSubCategory wasn't found" },
  })
  async deleteUserSubCategoryById(@Param('id', new ParseIntPipe()) id: number): Promise<UserSubCategory> {
    return this.userService.deleteUserSubCategoryById(id);
  }

  @Get('search/:searchWord')
  async getAuthors(@Param('searchWord') searchWord: string): Promise<User[]> {
    return this.userService.searchUser(searchWord);
  }
}
