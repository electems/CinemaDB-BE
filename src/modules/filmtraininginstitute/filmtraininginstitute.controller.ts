import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilmTrainingInstitute } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';

import { FilmTrainingInstituteService } from './filmtraininginstitute.service';
@Controller('filminsitutetraining')
@ApiTags('Film-Training-Institute')
export class FilmTrainingInstituteController {
  constructor(
    private readonly filmTrainingInstitute: FilmTrainingInstituteService,
  ) {}

  @Get('getallfilminsitutetraining')
  @ApiRoute({
    summary: 'Get All Film Training Institute',
    description: 'Retrieves All Film Training Institute',
  })
  async getAllAuditions(): Promise<any> {
    return this.filmTrainingInstitute.getAllFilmTrainingInstitutes();
  }

  @Post('createfilminsitutetraining')
  @ApiRoute({
    summary: 'Create a Film Training Institute',
    description: 'Creates a new Film Training Institute',
    badRequest: {},
  })
  async createAuditionCall(
    @Body() filmTrainingInstitute: FilmTrainingInstitute,
  ): Promise<FilmTrainingInstitute> {
    return this.filmTrainingInstitute.createFilmTrainingInstitute(
      filmTrainingInstitute,
    );
  }

  @Get('filmInstituteDetails/:fileName')
  @ApiRoute({
    summary: 'Get filmInstituteDetails',
    description: 'Retrieves filmInstituteDetails',
  })
  async getFilmInstituteDetail(
    @Param('fileName') fileName: string,
  ): Promise<FilmTrainingInstitute | null> {
    return this.filmTrainingInstitute.getFilmInstituteDetail(fileName);
  }
}
