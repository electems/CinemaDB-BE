/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { File } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';
import { multerOptions } from '@modules/common/fileupload';
import { videoUploadOptions } from '@modules/common/videoupload';

import { FileService } from './file.service';
@Controller('fileupload')
@ApiTags('File-Upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  public async upload(@UploadedFile() file: Express.Multer.File) {
    try {
      return file;
    } catch (e) {
      throw new HttpException(
        'Error in <FileControllers.upload>',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('file/video')
  @UseInterceptors(FileInterceptor('video', videoUploadOptions))
  public async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    try {
      return file;
    } catch (e) {
      throw new HttpException(
        'Error in <FileControllers.upload>',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('file/multiple')
  @UseInterceptors(FilesInterceptor('image', 5, multerOptions))
  public async uploadMultipleFiles(@UploadedFile() file: Express.Multer.File) {
    try {
      return file;
    } catch (e) {
      throw new HttpException(
        'Error in <FileControllers.upload>',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 20, multerOptions))
  logFiles(@UploadedFiles() images: any, @Body() fileDto: any) {
    return images;
  }

  @Post('createfile')
  @ApiRoute({
    summary: 'Create a AuditionCall',
    description: 'Creates a new AuditionCall',
    badRequest: {},
  })
  async createAuditionCall(@Body() auditionCall: File): Promise<File> {
    return this.fileService.createAuditionCall(auditionCall);
  }

  @Get('audition/:movieFk')
  @ApiRoute({
    summary: 'Get AuditionCall By MovieFk',
    description: 'Retrieves  AuditionCall By MovieFk',
  })
  async getAuditionCallByFk(
    @Param('movieFk', new ParseIntPipe()) movieFk: number,
  ): Promise<File[] | null> {
    return this.fileService.findAuditionByMovieId(movieFk);
  }

  @Get('allfiles')
  @ApiRoute({
    summary: 'Get All Auditions',
    description: 'Retrieves All Auditions',
  })
  async getAllMovies(): Promise<any> {
    return this.fileService.getAllAuditions();
  }

}
