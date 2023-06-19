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
  async createFile(@Body() file: File): Promise<File> {
    return this.fileService.createFile(file);
  }

  @Get('file/:tableId')
  @ApiRoute({
    summary: 'Get AuditionCall By tableId',
    description: 'Retrieves  AuditionCall By tableId',
  })
  async getFileByFk(
    @Param('tableId', new ParseIntPipe()) tableId: number,
  ): Promise<File[] | null> {
    return this.fileService.findFileByMovieId(tableId);
  }

  @Get('allfiles')
  @ApiRoute({
    summary: 'Get All Auditions',
    description: 'Retrieves All Auditions',
  })
  async getAllFiles(): Promise<any> {
    return this.fileService.getAllFiles();
  }
}
