import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

import { ApiRoute } from '@decorators/api-route';

import { LoggedUserDto } from './dto/logged-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.auth-guard';

@Controller('auth')
@ApiTags('auth-users')
export class PublicController {
  constructor(private readonly authService: AuthService) {}

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
}
