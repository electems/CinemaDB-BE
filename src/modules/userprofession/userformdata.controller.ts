import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserProfessionFormData } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';

import { UserFormService } from './userformdata.service';

@Controller('userprofession')
export class UserFormController {
  constructor(private readonly userFormService: UserFormService) {}

  @Get('formdata/:userid/:subCategory/:subCategoryType')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getUserForm(
    @Param('userid', new ParseIntPipe()) userid: number,
    @Param('subCategory') subCategory: string,
    @Param('subCategoryType') subCategoryType: string,
  ): Promise<any> {
    return this.userFormService.getUserSummaryFormData(
      userid,
      subCategory,
      subCategoryType,
    );
  }

  //post and put formdata
  @Post('createform/formdata')
  async userAndUserSubCategory(
    @Body() userProfessionFormData: UserProfessionFormData,
  ): Promise<void> {
    await this.userFormService.updateAndCreateForm(userProfessionFormData);
  }

  @Get('movies')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getAllMovies(): Promise<any> {
    return this.userFormService.getUserById();
  }
}
