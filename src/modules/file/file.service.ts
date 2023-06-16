import { Injectable } from '@nestjs/common';
import { File } from '@prisma/client';

import { DatabaseService } from '@database/database.service';

@Injectable()
export class FileService {
  constructor(private db: DatabaseService) {}

  async createAuditionCall(file: File): Promise<File> {
    const createFile = await this.db.file.create({
      data: file,
    });
    return createFile;
  }

  async findAuditionByMovieId(movieFk: number): Promise<File[] | null> {
    return this.db.file.findMany({
      where: {
        movieFk,
      },
    });
  }

  async getAllAuditions(): Promise<Array<File>> {
    return this.db.file.findMany();
  }

  async getUserSubCategoryById(originalName: string): Promise<File | null> {
    return this.db.file.findFirst({
      where: {
        originalName,
      },
    });
  }
}
