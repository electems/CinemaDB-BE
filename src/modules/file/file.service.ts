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

  async findFileByMovieType(): Promise<File[] | null> {
    return this.db.file.findMany({
      where: {
        AND: [
          {
            tableName: 'Movie',
          },
        ],
      },
    });
  }

}
