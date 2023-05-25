/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { Prisma, UserProfessionFormData } from '@prisma/client';

import { DatabaseService } from '@database/database.service';

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

  async getUserById(): Promise<UserProfessionFormData[]> {
    const query = await this.db.$queryRaw<UserProfessionFormData[]>`SELECT value
    FROM "UserProfessionFormData"
    WHERE EXISTS (SELECT *
    FROM jsonb_array_elements("UserProfessionFormData".value) c
    WHERE c->>'name' LIKE 'movie%')`;
    return query
  }
}
