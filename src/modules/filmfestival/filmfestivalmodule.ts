import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { FilmFestivalController } from './filmfestival.controller';
import { FilmFestivalService } from './filmfestival.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FilmFestivalController],
  providers: [FilmFestivalService],
  exports: [FilmFestivalService],
})
export class filmFestivalModule {}
