/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, UserProfessionFormData } from '@prisma/client';

import { DatabaseService } from '@database/database.service';

import emailConfig from '../../config/emailconfig.json';
import transport from '../../config/emialConfiguration';
interface moviesList {
  value?: string;
  text?: string;
  id?: number;
}

interface emialAndDate {
  date?: string;
  name?: string;
}

@Injectable()
export class UserFormService {
  constructor(private db: DatabaseService) {}

  async getUserSummaryFormData(
    userId: number,
    subCategory: string,
    subCategoryType: string,
  ): Promise<any> {
    Logger.log(
      'Start : UserFormService  : getUserSummaryFormData : userId = ',
      userId,
      'subCategory = ',
      subCategory,
      'subCategoryType = ',
      subCategoryType,
    );
    const query = this.db.$queryRaw`SELECT * FROM "UserProfessionFormData"  
       WHERE user_id=${userId} AND "subCategory"=${subCategory} AND "subCategoryType"=${subCategoryType}`;
    Logger.log(
      'End : UserFormService  : getUserSummaryFormData : response = ',
      query,
    );
    return query;
  }

  async getUserFormById(id: number): Promise<any> {
    Logger.log('Start : UserFormService  : getUserFormById : id =', id);
    const getUserByFormId = this.db
      .$queryRaw`SELECT * FROM "UserProfessionFormData"  
       WHERE id=${id}`;
    Logger.log(
      'End : UserFormService  : getUserFormById : responce ',
      getUserByFormId,
    );
    return getUserByFormId;
  }

  async getUserFormByUserId(id: number, subcategory: string): Promise<any> {
    Logger.log('Start : UserFormService  : getUserFormById : id =', id);
    const getUserByFormId = this.db
      .$queryRaw`SELECT * FROM "UserProfessionFormData" a 
       WHERE a.user_id=${id} AND a."subCategoryType" = 'Movie' AND a."subCategory"= ${subcategory}`;
    Logger.log(
      'End : UserFormService  : getUserFormById : responce ',
      getUserByFormId,
    );
    return getUserByFormId;
  }

  async getUserFormByUserIdAndType(
    id: number,
    subcategory: string,
  ): Promise<any> {
    Logger.log('Start : UserFormService  : getUserFormById : id =', id);
    const getUserByFormId = this.db
      .$queryRaw`SELECT * FROM "UserProfessionFormData" a 
       WHERE a.user_id=${id} AND a."subCategoryType" = 'Personnel Information' AND a."subCategory"= ${subcategory}`;
    Logger.log(
      'End : UserFormService  : getUserFormById : responce ',
      getUserByFormId,
    );
    return getUserByFormId;
  }

  async updateAndCreateForm(
    userProfessionFormData: UserProfessionFormData,
  ): Promise<UserProfessionFormData> {
    Logger.log(
      'Start : UserFormService  : updateAndCreateForm : payload =',
      userProfessionFormData,
    );
    if (userProfessionFormData.id === undefined) {
      const createUserProfessionFormData =
        await this.db.userProfessionFormData.create({
          data: {
            ...userProfessionFormData,
            value: userProfessionFormData.value as Prisma.JsonObject,
          },
        });
      return createUserProfessionFormData;
    }
    const updateUserProfessionFormData =
      await this.db.userProfessionFormData.update({
        where: { id: userProfessionFormData.id },
        data: {
          ...userProfessionFormData,
          value: userProfessionFormData.value as Prisma.JsonObject,
        },
      });
    Logger.log(
      'End : UserFormService  : updateAndCreateForm : response =',
      updateUserProfessionFormData,
    );
    return updateUserProfessionFormData;
  }

  async getMoviesByUserId(userId: any): Promise<any> {
    Logger.log(
      'Start : UserFormService  : getMoviesByUserId : userId =',
      userId,
    );
    const query = await this.db.$queryRaw<any[]>`SELECT id, value
    FROM "UserProfessionFormData"
    WHERE EXISTS (SELECT *
    FROM jsonb_array_elements("UserProfessionFormData".value) C
    WHERE "UserProfessionFormData".user_id = ${userId} AND c->>'name' LIKE 'movie%')`;

    const movieInputObject: any = [];
    for (let i = 0; i < query.length; i++) {
      query[i].value.map((item: any) => {
        Object.assign(item, { id: query[i].id });
        movieInputObject.push(item);
      });
    }
    const inputBasedOnOnlyMovieName = movieInputObject.filter(
      (item: any) => item.name.indexOf('movie_name') !== -1,
    );

    const getAllMovies: moviesList[] = [];
    inputBasedOnOnlyMovieName.map((item: any) => {
      getAllMovies.push({
        value: item.value,
        text: item.value,
        id: item.id,
      });
    });
    Logger.log(
      'End : UserFormService  : getMoviesByUserId : response =',
      getAllMovies,
    );
    return getAllMovies;
  }

  async getMoviesForLover(): Promise<any> {
    Logger.log('Start : UserFormService  : getMoviesForLover  : get');
    const query = await this.db.$queryRaw<any[]>`SELECT id, value
     FROM "UserProfessionFormData"
     WHERE EXISTS (SELECT *
     FROM jsonb_array_elements("UserProfessionFormData".value) c
     WHERE c->>'name' LIKE 'movie%')`;

    const movieInputObject: any = [];
    for (let i = 0; i < query.length; i++) {
      query[i].value.map((item: any) => {
        Object.assign(item, { id: query[i].id });
        movieInputObject.push(item);
      });
    }
    const inputBasedOnOnlyMovieName = movieInputObject.filter(
      (item: any) => item.name.indexOf('movie_name') !== -1,
    );
    const getAllMovies: moviesList[] = [];
    inputBasedOnOnlyMovieName.map((item: any) => {
      getAllMovies.push({
        value: item.value,
        text: item.value,
        id: item.id,
      });
    });
    Logger.log(
      'End : UserFormService  : getMoviesForLover  : response :',
      getAllMovies,
    );
    return getAllMovies;
  }

  async getRecordsBasedOnCases(days: any): Promise<any> {
    let result: any = '';
    switch (days) {
      case 'Today': {
        const date = new Date();
        const lastDayToLocaleString = date.toISOString().split('T');
        const todayDate = lastDayToLocaleString[0];
        const query = await this.db
          .$queryRaw`SELECT * FROM "UserProfessionFormData" a WHERE DATE(a.created_at) = ${todayDate}:: DATE AND a."subCategoryType" LIKE '%Movie'`;
        result = query;
        break;
      }
      case 'Last_30_Days': {
        const query = await this.db.$queryRaw`SELECT *
        FROM "UserProfessionFormData" a
        WHERE  Date(a.created_at) > current_date - INTERVAL '30' DAY
        AND a."subCategoryType" LIKE '%Movie'`;
        result = query;

        break;
      }
      case 'This_Week': {
        const date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        const firstDay = new Date(y, m, date.getDate());
        const firstDayToLocaleString = firstDay.toISOString().split('T');
        const lastDay = new Date(
          firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 7),
        );
        const lastDayToLocaleString = lastDay.toISOString().split('T');
        const query = await this.db.$queryRaw`SELECT *
        FROM "UserProfessionFormData" a
        WHERE  Date(a.created_at)
        BETWEEN ${firstDayToLocaleString[0]}:: DATE AND ${lastDayToLocaleString[0]} :: DATE`;
        result = query;
        break;
      }
      case 'BirthDay_Today': {
        const query = await this.db.$queryRaw<any[]>`SELECT id , a.value
        FROM "UserProfessionFormData" a
        WHERE  a."subCategoryType" = 'Personnel Information'`;
        const birthdayObject: any = [];
        for (let i = 0; i < query.length; i++) {
          query[i].value.map((item: any) => {
            Object.assign(item, { id: query[i].id });
            birthdayObject.push(item);
          });
        }
        const inputBasedOnDate = birthdayObject.filter(
          (item: any) => item.name.indexOf('date_picker') !== -1,
        );

        const inputBasedOnEmail = birthdayObject.filter(
          (item: any) => item.name.indexOf('email_input') !== -1,
        );
        const getAllEmailAndDate: emialAndDate[] = [];
        inputBasedOnDate.map((item: any) => {
          getAllEmailAndDate.push({
            date: item.value,
            name: item.value,
          });
        });
        // converting into single object of two diferent fields
        const arrayResut = inputBasedOnDate.map((primaryElement: any) => {
          primaryElement.userEmail = inputBasedOnEmail.filter(
            (secondaryElement: any) => secondaryElement.id == primaryElement.id,
          );
          return primaryElement;
        });
        const date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        const firstDay = new Date(y, m, date.getDate());
        const firstDayToLocaleString = firstDay.toLocaleDateString('en-CA');
        const getTodayDate = firstDayToLocaleString.replaceAll('-', '/');
        const arrays: any = [];
        arrayResut.map((item: any) => {
          if (item.value === getTodayDate) {
            arrays.push(item);
          }
        });
        result = arrays;
        break;
      }
      case 'BirthDay_Yesterday': {
        const query = await this.db.$queryRaw<any[]>`SELECT id , a.value
        FROM "UserProfessionFormData" a
        WHERE  a."subCategoryType" = 'Personnel Information'`;
        const birthdayObject: any = [];
        for (let i = 0; i < query.length; i++) {
          query[i].value.map((item: any) => {
            Object.assign(item, { id: query[i].id });
            birthdayObject.push(item);
          });
        }
        const inputBasedOnDate = birthdayObject.filter(
          (item: any) => item.name.indexOf('date_picker') !== -1,
        );

        const inputBasedOnName = birthdayObject.filter(
          (item: any) => item.name.indexOf('email_input') !== -1,
        );
        const getAllNameAndDate: emialAndDate[] = [];
        inputBasedOnDate.map((item: any) => {
          getAllNameAndDate.push({
            date: item.value,
            name: item.value,
          });
        });
        // converting into single object of two diferent fields
        const arrayResut = inputBasedOnDate.map((primaryElement: any) => {
          primaryElement.userEmail = inputBasedOnName.filter(
            (secondaryElement: any) => secondaryElement.id == primaryElement.id,
          );
          return primaryElement;
        });
        const date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        const firstDay = new Date(y, m, date.getDate() - 1);
        const firstDayToLocaleString = firstDay.toLocaleDateString('en-CA');
        const getYesterDayDate = firstDayToLocaleString.replaceAll('-', '/');
        const arrays: any = [];
        arrayResut.map((item: any) => {
          if (item.value === getYesterDayDate) {
            arrays.push(item);
          }
        });
        result = arrays;
        break;
      }
      case 'BirthDay_ThisWeek': {
        const query = await this.db.$queryRaw<any[]>`SELECT id , a.value
        FROM "UserProfessionFormData" a
        WHERE  a."subCategoryType" = 'Personnel Information'`;
        const birthdayObject: any = [];
        for (let i = 0; i < query.length; i++) {
          query[i].value.map((item: any) => {
            Object.assign(item, { id: query[i].id });
            birthdayObject.push(item);
          });
        }
        const inputBasedOnDate = birthdayObject.filter(
          (item: any) => item.name.indexOf('date_picker') !== -1,
        );

        const inputBasedOnName = birthdayObject.filter(
          (item: any) => item.name.indexOf('email_input') !== -1,
        );
        const getAllNameAndDate: emialAndDate[] = [];
        inputBasedOnDate.map((item: any) => {
          getAllNameAndDate.push({
            date: item.value,
            name: item.value,
          });
        });
        // converting into single object of two diferent fields
        const arrayResut = inputBasedOnDate.map((primaryElement: any) => {
          primaryElement.userEmail = inputBasedOnName.filter(
            (secondaryElement: any) => secondaryElement.id == primaryElement.id,
          );
          return primaryElement;
        });
        const date = new Date();
        const first = date.getDate() - date.getDay();
        const firstday = new Date(date.setDate(first)).toISOString().split('T');
        const last = first + 6;
        const lastday = new Date(date.setDate(last)).toISOString().split('T');
        const getFirstDayOfThisWeek = firstday[0].replaceAll('-', '/');
        const getLastDayOfThisWeek = lastday[0].replaceAll('-', '/');
        const arrays: any = [];
        arrayResut.map((item: any) => {
          if (
            item.value >= getFirstDayOfThisWeek &&
            item.value <= getLastDayOfThisWeek
          ) {
            arrays.push(item);
          }
        });
        result = arrays;
        break;
      }
      case 'BirthDay_ThisMonth': {
        const query = await this.db.$queryRaw<any[]>`SELECT id , a.value
        FROM "UserProfessionFormData" a
        WHERE  a."subCategoryType" = 'Personnel Information'`;
        const birthdayObject: any = [];
        for (let i = 0; i < query.length; i++) {
          query[i].value.map((item: any) => {
            Object.assign(item, { id: query[i].id });
            birthdayObject.push(item);
          });
        }
        const inputBasedOnDate = birthdayObject.filter(
          (item: any) => item.name.indexOf('date_picker') !== -1,
        );

        const inputBasedOnName = birthdayObject.filter(
          (item: any) => item.name.indexOf('email_input') !== -1,
        );
        const getAllNameAndDate: emialAndDate[] = [];
        inputBasedOnDate.map((item: any) => {
          getAllNameAndDate.push({
            date: item.value,
            name: item.value,
          });
        });
        // converting into single object of two diferent fields
        const arrayResut = inputBasedOnDate.map((primaryElement: any) => {
          primaryElement.userEmail = inputBasedOnName.filter(
            (secondaryElement: any) => secondaryElement.id == primaryElement.id,
          );
          return primaryElement;
        });
        const date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);
        const firstDayToLocaleString = firstDay.toLocaleDateString('en-CA');
        const lastDayToLocaleString = lastDay.toLocaleDateString('en-CA');
        const getFirstDayOfThisWeek = firstDayToLocaleString.replaceAll(
          '-',
          '/',
        );
        const getLastDayOfThisWeek = lastDayToLocaleString.replaceAll('-', '/');
        const arrays: any = [];
        arrayResut.map((item: any) => {
          if (
            item.value >= getFirstDayOfThisWeek &&
            item.value <= getLastDayOfThisWeek
          ) {
            arrays.push(item);
          }
        });
        result = arrays;
        break;
      }
      case 'This_Week_Release': {
        const date = new Date();
        const first = date.getDate() - date.getDay();
        const firstDay = new Date(date.setDate(first)).toISOString().split('T');
        const last = first + 6;
        const lastDay = new Date(date.setDate(last)).toISOString().split('T');
        const query = await this.db.$queryRaw<any[]>`SELECT id , a.value
        FROM "UserProfessionFormData" a
        WHERE  Date(a.created_at)
        BETWEEN ${firstDay[0]}:: DATE AND ${lastDay[0]} :: DATE AND a."subCategoryType" LIKE '%Movie'`;
        const movieObject: any = [];
        for (let i = 0; i < query.length; i++) {
          query[i].value.map((item: any) => {
            Object.assign(item, { id: query[i].id });
            movieObject.push(item);
          });
        }
        const inputBasedOnMovieName = movieObject.filter(
          (item: any) => item.name.indexOf('movie_name') !== -1,
        );
        const getAllNameAndDate: moviesList[] = [];
        inputBasedOnMovieName.map((item: any) => {
          getAllNameAndDate.push({
            value: item.value,
            id: item.id,
          });
        });
        result = getAllNameAndDate;
        break;
      }
      case 'Last_Week_Release': {
        const date = new Date();
        const first = date.getDate() - date.getDay();
        const firstDayOfLastWeek = first - 6;
        const firstDay = new Date(date.setDate(firstDayOfLastWeek))
          .toISOString()
          .split('T');
        const lastDayOfLastWeek = firstDayOfLastWeek + 6;
        const lastDay = new Date(date.setDate(lastDayOfLastWeek))
          .toISOString()
          .split('T');
        const query = await this.db.$queryRaw<any[]>`SELECT id , a.value
        FROM "UserProfessionFormData" a
        WHERE  Date(a.created_at)
        BETWEEN ${firstDay[0]}:: DATE AND ${lastDay[0]} :: DATE AND a."subCategoryType" LIKE '%Movie'`;
        const movieObject: any = [];
        for (let i = 0; i < query.length; i++) {
          query[i].value.map((item: any) => {
            Object.assign(item, { id: query[i].id });
            movieObject.push(item);
          });
        }
        const inputBasedOnMovieName = movieObject.filter(
          (item: any) => item.name.indexOf('movie_name') !== -1,
        );
        const getAllNameAndDate: moviesList[] = [];
        inputBasedOnMovieName.map((item: any) => {
          getAllNameAndDate.push({
            value: item.value,
            id: item.id,
          });
        });
        result = getAllNameAndDate;
        break;
      }
      case 'This_Month_Release': {
        const date = new Date(),
          y = date.getFullYear(),
          m = date.getMonth();
        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);
        const firstDayToLocaleString = firstDay.toLocaleDateString('en-CA');
        const lastDayToLocaleString = lastDay.toLocaleDateString('en-CA');
        const query = await this.db.$queryRaw<any[]>`SELECT id , a.value
        FROM "UserProfessionFormData" a
        WHERE  Date(a.created_at)
        BETWEEN ${firstDayToLocaleString}:: DATE AND ${lastDayToLocaleString} :: DATE AND a."subCategoryType" LIKE '%Movie'`;
        const movieObject: any = [];
        for (let i = 0; i < query.length; i++) {
          query[i].value.map((item: any) => {
            Object.assign(item, { id: query[i].id });
            movieObject.push(item);
          });
        }
        const inputBasedOnMovieName = movieObject.filter(
          (item: any) => item.name.indexOf('movie_name') !== -1,
        );
        const getAllNameAndDate: moviesList[] = [];
        inputBasedOnMovieName.map((item: any) => {
          getAllNameAndDate.push({
            value: item.value,
            id: item.id,
          });
        });
        result = getAllNameAndDate;
        break;
      }
    }
    return result;
  }

  public async sendMail(payload: any): Promise<void> {
    const emailBody = {
      from: emailConfig.fromEmailAddress,
      to: payload.to,
      subject: payload.subject,
      template: emailConfig.birthdayTemplate,
      context: {
        message: payload.context,
      },
    };
    transport.sendMail(emailBody, (error: any) => {
      error;
    });
  }
}
