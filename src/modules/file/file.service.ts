import { Injectable } from '@nestjs/common';
import { File } from '@prisma/client';

import { DatabaseService } from '@database/database.service';

@Injectable()
export class FileService {
  constructor(private db: DatabaseService) {}

  async createFile(file: File): Promise<File> {
    const createFile = await this.db.file.create({
      data: file,
    });
    return createFile;
  }

  async findFileByMovieId(tableId: number): Promise<File[] | null> {
    return this.db.file.findMany({
      where: {
        tableId: tableId,
      },
    });
  }

  async findUserProfileImage(tableId: number): Promise<any> {
    const fileName = await this.db.file.findFirst({
      where: {
        tableId: tableId,
      },
    });
    const directoryPath = fileName?.destination;
    const filePath = directoryPath + '/' + fileName?.fileName;
    return filePath;
  }

  async findFileByMovieName(name: string): Promise<File | null> {
    return this.db.file.findFirst({
      where: {
        fileName: name,
      },
    });
  }

  async getAllFiles(): Promise<Array<File>> {
    return this.db.file.findMany();
  }

  async getAllPostersOfFilmInstitute(tableId: number): Promise<Array<File>> {
    const filmInstitutePoster = await this.db.file.findMany({
      where: {
        AND: [
          {
            tableId: tableId,
          },
          {
            tableName: 'FilmTrainingInstitute',
          },
        ],
      },
    });
    return filmInstitutePoster;
  }

  async fetchAllPostersOfFilmInstituteForLover(): Promise<Array<File>> {
    const filmInstitutePoster = await this.db.file.findMany({
      where: {
        tableName: 'FilmTrainingInstitute',
      },
    });
    return filmInstitutePoster;
  }

  async getAllimagesOfFilmInstituteEvent(
    tableId: number,
  ): Promise<Array<File>> {
    const filmInstitutePoster = await this.db.file.findMany({
      where: {
        AND: [
          {
            tableId: tableId,
          },
          {
            tableName: 'FilmTrainingInstitute',
          },
        ],
      },
    });
    return filmInstitutePoster;
  }

  async fetchAllOfFilmInstituteForLover(): Promise<Array<File>> {
    const filmInstitutePoster = await this.db.file.findMany({
      where: {
        tableName: 'FilmTrainingInstitute',
      },
    });
    return filmInstitutePoster;
  }

  async findFileByMovieType(): Promise<File[] | null> {
    return this.db.file.findMany({
      where: {
        AND: [
          {
            tableName: {
              contains: 'Movie',
            },
          },
        ],
      },
    });
  }

  async findFileByProfessionalDetails(): Promise<File[] | null> {
    return this.db.file.findMany({
      where: {
        AND: [
          {
            tableName: 'Personnel Information',
          },
        ],
      },
    });
  }

  async getAllPostersOfAuditions(userId: number): Promise<any> {
    const query = await this.db.$queryRaw`SELECT t1.*
    FROM "File" t1 INNER JOIN "AuditionCall" t2 on t1.table_fk = t2.id
    INNER JOIN "User" t3 on t2.user_fk = t3.id WHERE t3.id = ${userId} AND t1."tableName" = 'AuditionCall'`;
    return query;
  }

  async fetchAllOfAuditionsForLover(): Promise<any> {
    const query = await this.db.$queryRaw`SELECT t1.*
    FROM "File" t1 WHERE t1."tableName" = 'AuditionCall'`;
    return query;
  }

  async fetchAuditionImagesByTableId(auditionId: number): Promise<any> {
    const query = await this.db.$queryRaw`SELECT t1.*
    FROM "File" t1 WHERE t1.table_fk = ${auditionId}  AND t1."tableName" = 'AuditionCall'`;
    return query;
  }

  async getProfile(userId: number): Promise<any> {
    const query = await this.db.$queryRaw`SELECT t1.*
    FROM "File" t1 INNER JOIN "UserProfessionFormData" t2 on t1.table_fk = t2.id
    INNER JOIN "User" t3 on t2.user_id = t3.id WHERE t3.id = ${userId} AND t1."tableName" = 'Personnel Information' `;
    return query;
  }

  async getProfileToLink(userId: number): Promise<any> {
    const query = await this.db.$queryRaw`SELECT t1.*
    FROM "File" t1 INNER JOIN "UserProfessionFormData" t2 on t1.table_fk = t2.id
    INNER JOIN "User" t3 on t2.user_id = t3.id WHERE t3.id = ${userId} AND t1."tableName" = 'Personnel Information' `;
    return query;
  }
}
