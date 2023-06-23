/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common';
import { AuditionCall, AuditionCallNotification } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
@Injectable()
export class AuditionCallService {
  constructor(private db: DatabaseService) {}

  async createAuditionCall(auditionCall: AuditionCall): Promise<AuditionCall> {
    Logger.log(
      'Start : AuditionCallService  : createAuditionCall  : payload :',
      auditionCall,
    );
    const createAuditionCall = await this.db.auditionCall.create({
      data: auditionCall,
    });
    Logger.log(
      'End : AuditionCallService  : createAuditionCall  : response :',
      createAuditionCall,
    );
    return createAuditionCall;
  }

  async getAllAuditions(): Promise<Array<AuditionCall>> {
    Logger.log('Start : AuditionCallService  : getAllAuditions  : getAll :');
    const findAllAuditions = this.db.auditionCall.findMany();
    Logger.log(
      'End : AuditionCallService  : getAllAuditions  : response :',
      findAllAuditions,
    );
    return findAllAuditions;
  }

  async findAuditionByMovieId(movieFk: number): Promise<AuditionCall[] | null> {
    return this.db.auditionCall.findMany({
      where: {
        movieFk,
      },
    });
  }

  async searchAudition(searchWord: string): Promise<AuditionCall[]> {
    const auditions = await this.db.auditionCall.findMany({
      where: {
        OR: [
          {
            auditionCategory: {
              contains: searchWord,
            },
          },
        ],
      },
    });
    return auditions;
  }

  async getAuditionsByThisWeek(): Promise<any> {
    const todayDate = new Date().toLocaleDateString('en-CA');
    const query = await this.db.$queryRaw`SELECT *
    FROM "AuditionCall" a
    WHERE ${todayDate}
    BETWEEN a.start_date AND a.end_date`;
    return query;
  }

  async getAuditionsByThisMonth(): Promise<any> {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const firstDayToLocaleString = firstDay.toLocaleDateString('en-CA');
    const lastDayToLocaleString = lastDay.toLocaleDateString('en-CA');
    const query = await this.db.$queryRaw`SELECT *
    FROM "AuditionCall" a
    WHERE  a.start_date
    BETWEEN ${firstDayToLocaleString} AND ${lastDayToLocaleString}`;
    return query;
  }

  async findNotificationByUserFk(
    userFk: number,
  ): Promise<AuditionCallNotification[]> {
    return this.db.auditionCallNotification.findMany({
      where: {
        userFk,
      },
    });
  }

  async createAuditionNofication(
    auditionCallNotification: AuditionCallNotification,
  ): Promise<AuditionCallNotification> {
    const createAuditionCall = await this.db.auditionCallNotification.create({
      data: auditionCallNotification,
    });
    return createAuditionCall;
  }

  async getAuditionsNotificationByUserId(id: any): Promise<any> {
    const query = await this.db.$queryRaw`SELECT t1.*
    FROM "AuditionCallNotification" t1 
    INNER JOIN "AuditionCall" t2 on t1.auditioncall_fk = t2.id
    INNER JOIN "User" t3 on t2.user_fk = t3.id WHERE t3.id = ${id}`;
    return query;
  }
}
