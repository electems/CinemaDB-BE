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
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { File } from '@prisma/client';
import { Response } from 'express';

import { DatabaseService } from '@database/database.service';
import { ApiRoute } from '@decorators/api-route';
import { multerOptions } from '@modules/common/fileupload';
import { pdfFilesUpload } from '@modules/common/pdfupload';
import { videoUploadOptions } from '@modules/common/videoupload';

import { FileService } from './file.service';
// import pathconfig from '../../config/pathconfig.json';
@Controller('fileupload')
@ApiTags('File-Upload')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private db: DatabaseService,
  ) {}

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
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
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

  @Get('/filename/:filename')
  @UseInterceptors()
  async getFileByName(@Param('filename') name: string) {
    const file = await this.db.file.findFirst({
      where: {
        fileName: name,
      },
    });
    return file;
  }

  @Get('userprofile/:tableId')
  @ApiRoute({
    summary: 'Get All Auditions',
    description: 'Retrieves All Auditions',
  })
  async findUserProfileImage(
    @Param('tableId', new ParseIntPipe()) tableId: number,
    @Res() res: Response,
  ): Promise<any> {
    const filePath = await this.fileService.findUserProfileImage(tableId);
    return res.download(filePath);
  }

  @Get('filmInstitutePosters/:tableId')
  @ApiRoute({
    summary: 'Get filmInstitutePosters',
    description: 'Retrieves filmInstitutePosters',
  })
  async getFilmInstitutePoster(
    @Param('tableId', new ParseIntPipe()) tableId: number,
  ): Promise<any> {
    return this.fileService.getAllPostersOfFilmInstitute(tableId);
  }

  @Get('filmInstitutePostersForLover/')
  @ApiRoute({
    summary: 'Get filmInstitutePosters',
    description: 'Retrieves filmInstitutePosters',
  })
  async fetchAllPostersOfFilmInstituteForLover(): Promise<any> {
    return this.fileService.fetchAllPostersOfFilmInstituteForLover();
  }

  @Get('/getallfilesbymovietype')
  @UseInterceptors()
  async findFileByMovieType(): Promise<File[] | null> {
    return this.fileService.findFileByMovieType();
  }

  @Get('/getallfilesbyprofessionalinformation')
  @UseInterceptors()
  async findFileByProfessionalInformation(): Promise<File[] | null> {
    return this.fileService.findFileByProfessionalDetails();
  }

  @Get('auditionsposters/:userId')
  @ApiRoute({
    summary: 'Get filmInstitutePosters',
    description: 'Retrieves filmInstitutePosters',
  })
  async getAuditionPoster(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<any> {
    return this.fileService.getAllPostersOfAuditions(userId);
  }

  @Get('auditionspostersforlovers')
  @ApiRoute({
    summary: 'Get filmInstitutePosters',
    description: 'Retrieves filmInstitutePosters',
  })
  async getAuditionPosterForLovers(): Promise<any> {
    return this.fileService.fetchAllOfAuditionsForLover();
  }

  @Get('auditionspostersbyauditionid/:auditionId')
  @ApiRoute({
    summary: 'Get filmInstitutePosters',
    description: 'Retrieves filmInstitutePosters',
  })
  async getAuditionImagesByAuditionID(
    @Param('auditionId', new ParseIntPipe()) auditionId: number,
  ): Promise<any> {
    return this.fileService.fetchAuditionImagesByTableId(auditionId);
  }

  @Post('file/resume')
  @UseInterceptors(FileInterceptor('file', pdfFilesUpload))
  public async uploadResumeForFilmInstitute(
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return file;
    } catch (e) {
      throw new HttpException(
        'Error in <FileControllers.upload>',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getProfileByid/:userId')
  @ApiRoute({
    summary: 'Get filmInstitutePosters',
    description: 'Retrieves filmInstitutePosters',
  })
  async getProfileImage(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<any> {
    return this.fileService.getProfile(userId);
  }

  @Get('files/profile/:subcategorytype/:tableId/:fileName')
  @ApiRoute({
    summary: 'Get Profile Images',
    description: 'Retrieves Profile Images',
  })
  async getProfilePictureByName(
    @Param('tableId', new ParseIntPipe()) tableId: number,
    @Param('fileName') fileName: string,
    @Param('subcategorytype') subcategorytype: string,
    @Res() res: any,
  ): Promise<any> {
    let result: any = '';
    switch (subcategorytype) {
      case 'Personnel Information': {
        const query = await this.db.$queryRaw<any[]>`SELECT *
        FROM "File" WHERE "tableName" = ${subcategorytype} AND "table_fk" = ${tableId} AND "fileName" = ${fileName} `;
        const directoryPath = query[0].destination;
        const filePath = directoryPath + '/' + fileName;
        result = res.download(filePath)
      }
    }
    return result
  }

}
