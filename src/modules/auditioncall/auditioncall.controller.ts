import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditionCall, AuditionCallNotification } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';

import { AuditionCallService } from './auditioncall.service';
@Controller('auditioncall')
@ApiTags('Audition-Call')
export class AuditionCallController {
  constructor(private readonly auditionCall: AuditionCallService) {}

  @Get('audtions')
  @ApiRoute({
    summary: 'Get All Auditions',
    description: 'Retrieves All Auditions',
  })
  async getAllMovies(): Promise<any> {
    return this.auditionCall.getAllAuditions();
  }

  @Post('createAuditionCall')
  @ApiRoute({
    summary: 'Create a AuditionCall',
    description: 'Creates a new AuditionCall',
    badRequest: {},
  })
  async createAuditionCall(
    @Body() auditionCall: AuditionCall,
  ): Promise<AuditionCall> {
    return this.auditionCall.createAuditionCall(auditionCall);
  }

  @Get('audition/:movieFk')
  @ApiRoute({
    summary: 'Get AuditionCall By MovieFk',
    description: 'Retrieves  AuditionCall By MovieFk',
  })
  async getAuditionCallByFk(
    @Param('movieFk', new ParseIntPipe()) movieFk: number,
  ): Promise<AuditionCall[] | null> {
    return this.auditionCall.findAuditionByMovieId(movieFk);
  }

  @Get('search/:searchWord')
  async getAuthors(
    @Param('searchWord') searchWord: string,
  ): Promise<AuditionCall[]> {
    return this.auditionCall.searchAudition(searchWord);
  }

  @Get('week')
  async getQuery(): Promise<any> {
    return this.auditionCall.getAuditionsByThisWeek();
  }

  @Get('month')
  async getAuditionsByMonth(): Promise<any> {
    return this.auditionCall.getAuditionsByThisMonth();
  }

  @Get('audition/notification/:userFk')
  @ApiRoute({
    summary: 'Get AuditionCallNotification By UserFk',
    description: 'Retrieves  AuditionCallNotification By UserFk',
  })
  async getAuditionNotificationByUserFk(
    @Param('userFk', new ParseIntPipe()) userFk: number,
  ): Promise<AuditionCallNotification[] | null> {
    return this.auditionCall.findNotificationByUserFk(userFk);
  }

  @Post('createAuditionCallNotification')
  @ApiRoute({
    summary: 'Create a AuditionCallNotification',
    description: 'Creates a new AuditionCallNotification',
    badRequest: {},
  })
  async createAuditionCallNotification(
    @Body() auditionCallNotification: AuditionCallNotification,
  ): Promise<AuditionCallNotification> {
    return this.auditionCall.createAuditionNofication(auditionCallNotification);
  }

  @Get('audition/person/notification/:userId')
  @ApiRoute({
    summary: 'Get AuditionCallNotification By UserFk',
    description: 'Retrieves  AuditionCallNotification By UserFk',
  })
  async getAuditionNotificationByUserId(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<AuditionCallNotification[] | null> {
    return this.auditionCall.getAuditionsNotificationByUserId(userId);
  }
 
}
