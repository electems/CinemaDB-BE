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
@ApiTags('Users')
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

  @Get('/:id')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getUser(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Get('user/:id')
  @ApiRoute({
    summary: 'Get UserSubCategory',
    description: 'Retrieves  UserSubCategory',
  })
  async getUserById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User | null> {
    return this.userService.getUser(id);
  }

  @Get('user/userdetails/:id')
  @ApiRoute({
    summary: 'Get UserSubCategory',
    description: 'Retrieves  UserSubCategory',
  })
  async getUserDetailsByid(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User | null> {
    return this.userService.getUserById(id);
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

  @Post('createUserSubCategory')
  @ApiRoute({
    summary: 'Create a UserSubCategory',
    description: 'Creates a new UserSubCategory',
    badRequest: {},
  })
  async createUserSubCategory(
    @Body() newUserSubCategory: UserSubCategory,
  ): Promise<UserSubCategory> {
    return this.userService.createOneUserSubCategory(newUserSubCategory);
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
  async deleteUserSubCategoryById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return this.userService.deleteUserSubCategoryById(id);
  }

  @Get('search/:searchWord')
  async getAuthors(@Param('searchWord') searchWord: string): Promise<User[]> {
    return this.userService.searchUser(searchWord);
  }

  @Post('userAndUserSubCategory')
  async userAndUserSubCategory(
    @Body() userAndUserSubCategory: any,
  ): Promise<void> {
    await this.userService.userAndUserSubCategory(userAndUserSubCategory);
  }

  @Get('/profilename/:tableId')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getProfileName(@Param('tableId') tableId: number): Promise<any> {
    return this.userService.getUserName(tableId);
  }

  @Get('/profession/:userId')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getUserProfession(@Param('userId') userId: number): Promise<any> {
    return this.userService.getUserProfession(userId);
  }
}
