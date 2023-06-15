import { Injectable } from '@nestjs/common';
import { AuditionCall } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
@Injectable()
export class AuditionCallService {
  constructor(private db: DatabaseService) {}

  async createAuditionCall(auditionCall: AuditionCall): Promise<AuditionCall> {
    const createAuditionCall = await this.db.auditionCall.create({
      data: auditionCall,
    });
    return createAuditionCall;
  }

  async getAllAuditions(): Promise<Array<AuditionCall>> {
    return this.db.auditionCall.findMany();
  }

  async findAuditionByMovieId(movieFk: number): Promise<AuditionCall[] | null> {
    return this.db.auditionCall.findMany({
      where: {
        movieFk,
      },
    });
  }
}
