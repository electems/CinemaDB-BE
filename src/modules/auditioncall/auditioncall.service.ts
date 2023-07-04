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

  async findAuditionByTableFk(id: number): Promise<AuditionCall[] | null> {
    return this.db.auditionCall.findMany({
      where: {
        id: id,
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

  async getAuditionsByWeekAndMonth(weekAndMonth: any): Promise<any> {
    let result: any = '';
    switch (weekAndMonth) {
      case 'Last_Week_Auditions': {
        const date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        const firstDay = new Date(y, m, date.getDate() - 7);
        const firstDayToLocaleString = firstDay.toISOString().split('T');
        const lastDay = new Date(
          firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 7),
        );
        const lastDayToLocaleString = lastDay.toISOString().split('T')
        const query = await this.db.$queryRaw`SELECT *
        FROM "AuditionCall" a
        WHERE  a.start_date
        BETWEEN ${firstDayToLocaleString[0]} AND ${lastDayToLocaleString[0]}`;
        result = query;
        break;
      }
      case 'This_week_Auditions': {
        const todayDate = new Date().toLocaleDateString('en-CA');
        const query = await this.db.$queryRaw`SELECT *
        FROM "AuditionCall" a
        WHERE ${todayDate}
        BETWEEN a.start_date AND a.end_date`;
        result = query;
        break;
      }
      case 'This_Month_Auditions': {
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
        result = query;
        break;
      }
    }
    return result;
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
    FROM "Notification" t1 
    INNER JOIN "AuditionCall" t2 on t1.table_id = t2.id
    INNER JOIN "User" t3 on t2.user_fk = t3.id WHERE t3.id = ${id}`;
    return query;
  }
}
