/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common';
import {
  FilmTrainingInstitute,
  FilmTrainingInstituteEvent,
} from '@prisma/client';

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

  async getAllFilmTrainingInstitutes(
    userId: number,
  ): Promise<Array<FilmTrainingInstitute>> {
    Logger.log(
      'Start : FilmTrainingInstituteService  : getAllFilmTrainingInstitutes  : getAll :',
    );
    const filmTrainingInstitute = this.db.filmTrainingInstitute.findMany({
      where: {
        userFK: userId,
      },
    });
    Logger.log(
      'End : FilmTrainingInstituteService  : getAllFilmTrainingInstitutes  : response :',
      filmTrainingInstitute,
    );
    return filmTrainingInstitute;
  }

  async fetchFilmInstituteDetailByFileName(
    fileName: string,
  ): Promise<FilmTrainingInstitute | null> {
    Logger.log(
      'Start : FilmTrainingInstituteService  : getFilmInstituteDetail  : fetchFilmInstituteDetailByFileName :',
    );
    const filmTrainingInstitute = await this.db.filmTrainingInstitute.findFirst(
      {
        where: {
          fileName: fileName,
        },
      },
    );
    Logger.log(
      'End : FilmTrainingInstituteService  : fetchFilmInstituteDetailByFileName  : response :',
      filmTrainingInstitute,
    );
    return filmTrainingInstitute;
  }

  async getFilmInstituteDetailById(
    id: number,
  ): Promise<FilmTrainingInstitute | null> {
    Logger.log(
      'Start : FilmTrainingInstituteService  : getFilmInstituteDetail  : getFilmInstituteDetail :',
    );
    const filmTrainingInstitute = await this.db.filmTrainingInstitute.findFirst(
      {
        where: {
          id: id,
        },
        include: {
          filmTrainingInstituteEvents: true,
        },
      },
    );
    Logger.log(
      'End : FilmTrainingInstituteService  : getFilmInstituteDetail  : response :',
      filmTrainingInstitute,
    );
    return filmTrainingInstitute;
  }

  async createFilmTrainingInstituteEvent(
    filmTrainingInstitutEvent: FilmTrainingInstituteEvent,
  ): Promise<FilmTrainingInstituteEvent> {
    Logger.log(
      'Start : FilmTrainingInstituteService  : createFilmTrainingInstituteEvent  : payload :',
      filmTrainingInstitutEvent,
    );
    const createFilmTrainingInstituteEvent =
      await this.db.filmTrainingInstituteEvent.create({
        data: filmTrainingInstitutEvent,
      });
    Logger.log(
      'End : FilmTrainingInstituteService  : createFilmTrainingInstituteEvent  : response :',
      createFilmTrainingInstituteEvent,
    );
    return createFilmTrainingInstituteEvent;
  }
}
