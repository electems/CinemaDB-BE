import { Module } from '@nestjs/common';

import { DatabaseService } from '@modules/database/database.service';

import { FilmTrainingInstituteController } from './filmtraininginstitute.controller';
import { FilmTrainingInstituteService } from './filmtraininginstitute.service';
import { NotificationService } from '@modules/notification/notification.service';
@Module({
  imports: [],
  controllers: [FilmTrainingInstituteController],
  providers: [FilmTrainingInstituteService, DatabaseService, NotificationService],
  exports: [FilmTrainingInstituteService],
})
export class FilmTrainingInstituteModule {}
