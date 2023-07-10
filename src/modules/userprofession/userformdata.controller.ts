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
  ): Promise<UserProfessionFormData> {
    return this.userFormService.updateAndCreateForm(userProfessionFormData);
  }

  @Get('movies/:userid')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getAllMoviesByUserId(
    @Param('userid', new ParseIntPipe()) userid: number,
  ): Promise<any> {
    return this.userFormService.getMoviesByUserId(userid);
  }

  @Get('getbasedonmovietype/:userid/:subcategory')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getUserProfessionFormDataByUserId(
    @Param('userid', new ParseIntPipe()) userid: number,
    @Param('subcategory') subcategory: string,
  ): Promise<any> {
    return this.userFormService.getUserFormByUserId(userid, subcategory);
  }

  @Get('getbasedonmovietype/type/:userid/:subcategory')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getUserProfessionFormDataByUserIdAndType(
    @Param('userid', new ParseIntPipe()) userid: number,
    @Param('subcategory') subcategory: string,
  ): Promise<any> {
    return this.userFormService.getUserFormByUserIdAndType(userid, subcategory);
  }

  @Get('movies/auditionmovies/lovers')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getAllMovies(): Promise<any> {
    return this.userFormService.getMoviesForLover();
  }

  @Get('getmoviesbyweekmonthand30days/:type')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getAllMoviesForMainPage(@Param('type') type: any): Promise<any> {
    return this.userFormService.getRecordsBasedOnCases(type);
  }

  @Post('sendmailtocelebrity')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async sendMailToCelebrity(@Body() payload: any): Promise<any> {
    return this.userFormService.sendMail(payload);
  }
}
