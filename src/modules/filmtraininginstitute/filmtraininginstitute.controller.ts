import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilmTrainingInstitute, FilmTrainingInstituteEvent, Notification } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';

import { FilmTrainingInstituteService } from './filmtraininginstitute.service';
import { NotificationService } from '@modules/notification/notification.service';
@Controller('filminsitutetraining')
@ApiTags('Film-Training-Institute')
export class FilmTrainingInstituteController {
  constructor(
    private readonly filmTrainingInstitute: FilmTrainingInstituteService,
    private readonly notificationService: NotificationService
  ) {}

  @Get('getallfilminsitutetraining/:userId')
  @ApiRoute({
    summary: 'Get All Film Training Institute',
    description: 'Retrieves All Film Training Institute',
  })
  async getAllFilmTrainingInstitutes( @Param('userId')  userId:number): Promise<any> {
    return this.filmTrainingInstitute.getAllFilmTrainingInstitutes(userId);
  }

  @Post('createfilminsitutetraining')
  @ApiRoute({
    summary: 'Create a Film Training Institute',
    description: 'Creates a new Film Training Institute',
    badRequest: {},
  })
  async createFilmTrainingInstitute(
    @Body() filmTrainingInstitute: FilmTrainingInstitute,
  ): Promise<FilmTrainingInstitute> {
    return this.filmTrainingInstitute.createFilmTrainingInstitute(
      filmTrainingInstitute,
    );
  }

  @Get('filmInstituteDetailsByFileName/:fileName')
  @ApiRoute({
    summary: 'Get filmInstituteDetails',
    description: 'Retrieves filmInstituteDetails',
  })
  async fetchFilmInstituteDetailByFileName(
    @Param('fileName') fileName: string,
  ): Promise<FilmTrainingInstitute | null> {
    return this.filmTrainingInstitute.fetchFilmInstituteDetailByFileName(fileName);
  }

  @Get('filmInstituteDetails/:id')
  @ApiRoute({
    summary: 'Get filmInstituteDetails',
    description: 'Retrieves filmInstituteDetails',
  })
  async getFilmInstituteDetailById(
    @Param('id') id: number,
  ): Promise<FilmTrainingInstitute | null> {
    return this.filmTrainingInstitute.getFilmInstituteDetailById(id);
  }

  @Post('createfilminsitutetrainingevent')
  @ApiRoute({
    summary: 'Create a Film Training Institute Event',
    description: 'Creates a new Film Training Institute Event',
    badRequest: {},
  })
  async createFilmTrainingInstituteEvent(
    @Body() filmTrainingInstituteEvent: FilmTrainingInstituteEvent,
  ): Promise<FilmTrainingInstituteEvent> {
    return this.filmTrainingInstitute.createFilmTrainingInstituteEvent(
      filmTrainingInstituteEvent
    );
  }

  @Post('/filmInstituteTraining/notification')
  @ApiRoute({
    summary: 'Create a Film Training Institute Event',
    description: 'Creates a new Film Training Institute Event',
    badRequest: {},
  })
  async filmInstituteNotification(
    @Body() notificationData: Notification,
  ): Promise<Notification> {
    return this.notificationService.createNotification(
      notificationData
    );
  }

}
