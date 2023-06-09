import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  BadRequestException,
  Param,
  Body,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

import { ApiRoute } from '@decorators/api-route';
import { FormManagerService } from '@modules/formmanager/formmanager.service';

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
    private readonly formsService: FormManagerService,
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

  //update is part of getOTP before login
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

  //Used to retrive picture in main screen before login
  @Get('/:language/:formlayout')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getFormLayout(
    @Param('language') language: string,
    @Param('formlayout') formlayout: string,
  ): Promise<string> {
    return this.formsService.getFormLayout(language, formlayout);
  }
}
