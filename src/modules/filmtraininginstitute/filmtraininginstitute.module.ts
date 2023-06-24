import { Module } from '@nestjs/common';

import { DatabaseService } from '@modules/database/database.service';

import { FilmTrainingInstituteController } from './filmtraininginstitute.controller';
import { FilmTrainingInstituteService } from './filmtraininginstitute.service';
@Module({
  imports: [],
  controllers: [FilmTrainingInstituteController],
  providers: [FilmTrainingInstituteService, DatabaseService],
  exports: [FilmTrainingInstituteService],
})
export class FilmTrainingInstituteModule {}
