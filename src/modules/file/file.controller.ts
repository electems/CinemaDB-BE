/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */


import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { multerOptions } from '@modules/common/fileupload';
@Controller('fileupload')
export class FileController {
  constructor() {}

  @Post('file')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  public async upload(@UploadedFile() file: Express.Multer.File) {
    try { 
      return file.path;
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
      return file.destination;
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
}
