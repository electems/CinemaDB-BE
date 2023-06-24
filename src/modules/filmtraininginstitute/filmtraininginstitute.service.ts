/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common';
import { FilmTrainingInstitute } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
@Injectable()
export class FilmTrainingInstituteService {
  constructor(private db: DatabaseService) {}

  async createFilmTrainingInstitute(
    filmTrainingInstitute: FilmTrainingInstitute,
  ): Promise<FilmTrainingInstitute> {
    Logger.log(
      'Start : FilmTrainingInstituteService  : createFilmTrainingInstitute  : payload :',
      filmTrainingInstitute,
    );
    const createFilmTrainingInstitute =
      await this.db.filmTrainingInstitute.create({
        data: filmTrainingInstitute,
      });
    Logger.log(
      'End : FilmTrainingInstituteService  : createFilmTrainingInstitute  : response :',
      createFilmTrainingInstitute,
    );
    return createFilmTrainingInstitute;
  }

  async getAllFilmTrainingInstitutes(): Promise<Array<FilmTrainingInstitute>> {
    Logger.log(
      'Start : FilmTrainingInstituteService  : getAllFilmTrainingInstitutes  : getAll :',
    );
    const filmTrainingInstitute = this.db.filmTrainingInstitute.findMany();
    Logger.log(
      'End : FilmTrainingInstituteService  : getAllFilmTrainingInstitutes  : response :',
      filmTrainingInstitute,
    );
    return filmTrainingInstitute;
  }
}
