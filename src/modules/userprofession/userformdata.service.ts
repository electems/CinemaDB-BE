/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, UserProfessionFormData } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
interface moviesList {
  value: string;
  text: string;
  id: number;
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

  async updateAndCreateForm(
    userProfessionFormData: UserProfessionFormData,
  ): Promise<UserProfessionFormData> {
    Logger.log(
      'Start : UserFormService  : updateAndCreateForm : payload =',
      userProfessionFormData,
    );
    if (userProfessionFormData.id === undefined) {
      const createUserProfessionForm =
        await this.db.userProfessionFormData.create({
          data: {
            ...userProfessionFormData,
            value: userProfessionFormData.value as Prisma.JsonObject,
          },
        });
      return createUserProfessionForm;
    }
    const updateUserProfessionForm =
      await this.db.userProfessionFormData.update({
        where: { id: userProfessionFormData.id },
        data: {
          ...userProfessionFormData,
          value: userProfessionFormData.value as Prisma.JsonObject,
        },
      });
    Logger.log(
      'End : UserFormService  : updateAndCreateForm : response =',
      updateUserProfessionForm,
    );
    return updateUserProfessionForm;
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
}
