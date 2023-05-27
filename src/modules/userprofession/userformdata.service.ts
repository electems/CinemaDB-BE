/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { Prisma, UserProfessionFormData } from '@prisma/client';
// import { v4 as uuidv4 } from 'uuid';

import { DatabaseService } from '@database/database.service';
interface moviesList {
  value: number;
  text: string;
  id: number
}
@Injectable()
export class UserFormService {
  constructor(private db: DatabaseService) {}

  async getUserSummaryFormData(
    userId: number,
    subCategory: string,
    subCategoryType: string,
  ): Promise<any> {
    return this.db.$queryRaw`SELECT * FROM "UserProfessionFormData"  
       WHERE user_id=${userId} AND "subCategory"=${subCategory} AND "subCategoryType"=${subCategoryType}`;
  }

  async getUserFormById(id: number): Promise<any> {
    return this.db.$queryRaw`SELECT * FROM "UserProfessionFormData"  
       WHERE id=${id}`;
  }

  async updateAndCreateForm(
    userProfessionFormData: UserProfessionFormData,
  ): Promise<UserProfessionFormData> {
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
    return updateUserProfessionForm;
  }

  async getMovies(): Promise<any> {
    const query = await this.db.$queryRaw<any[]>`SELECT value
    FROM "UserProfessionFormData"
    WHERE EXISTS (SELECT *
    FROM jsonb_array_elements("UserProfessionFormData".value) c
    WHERE c->>'name' LIKE 'movie%')`;
    const movieInputObject: any = [];
    for (let i = 0; i < query.length; i++) {
      query[i].value.map((item: any) => {
        movieInputObject.push(item);
      });
    }
    const inputBasedOnOnlyMovieName = movieInputObject.filter(
      (item: any) => item.name.indexOf('movie_name') !== -1,
    );
    let id = 1;
    const getAllMovies: moviesList[] = [];
    inputBasedOnOnlyMovieName.map((item: any) => {
      getAllMovies.push({
        value: item.value,
        text: item.value,
        id: id++
      });
    });
    return getAllMovies;
  }
}
