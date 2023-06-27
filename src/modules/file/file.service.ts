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
}
