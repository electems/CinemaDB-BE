import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditionCall } from '@prisma/client';

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
}
