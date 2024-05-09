import { Injectable } from '@nestjs/common';
import { FilmFestival } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
// import { uploadFile } from '../common/uploadsingle';

@Injectable()
export class FilmFestivalService {
  constructor(private db: DatabaseService) {}

  async getFilmFestivalById(id: number): Promise<any> {
    return this.db.$queryRaw`SELECT * FROM "FilmFestival"
       WHERE id=${id}`;
  }

  async createFilmFestival(filmFestival: FilmFestival): Promise<FilmFestival> {
    if (filmFestival.id === undefined) {
      const filmFestivalCreate = await this.db.filmFestival.create({
        data: {
          ...filmFestival,
        },
      });
      return filmFestivalCreate;
    }
    const filmFestivalUpdate = await this.db.filmFestival.update({
      where: { id: filmFestival.id },
      data: {
        ...filmFestival,
      },
    });
    return filmFestivalUpdate;
  }

  async getAllFilmFestivalUsers(): Promise<Array<FilmFestival>> {
    return this.db.filmFestival.findMany();
  }
}
