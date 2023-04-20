/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';
import { JwtAuthGuard } from '@modules/users/auth/guards/jwt.auth-guard';

import { RegistrationService } from './formmanager.service';
import pathconfig from '../../config/pathconfig.json';

@UseGuards(JwtAuthGuard)
@Controller('form')
@ApiTags('forms-json')
@ApiBearerAuth()
export class FormController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get('/:language/:formlayout')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getFormLayout(
    @Param('language') language: string,
    @Param('formlayout') formlayout: string,
  ): Promise<JSON> {
    return this.registrationService.getFormLayout(language, formlayout);
  }

  @Post('/:path/:formlayout')
  @ApiRoute({
    summary: 'Insert fields',
    description: 'Insert dynamic fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async createFormLayout(
    @Param('path') path: string,
    @Param('formlayout') formlayout: string,
    @Body() body: object,
  ): Promise<string> {
    //const jsonData = JSON.parse(data);
    return this.registrationService.createFormLayout(path, formlayout, body);
  }

  //List all directories inside Folder
  @Get('/:path')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getDirectoryListing(@Param('path') path: string): Promise<any> {
    const directoriesInDirectory = fs
      .readdirSync(`${pathconfig.FilePath}/${path}`, { withFileTypes: true })
      .filter((item: { isDirectory: () => any }) => item.isDirectory())
      .map((item: { name: any }) => item.name);
    return directoriesInDirectory;
  }

  //Create directory inside directory
  @Post('createdirectory/:path/:dirname')
  @ApiRoute({
    summary: 'Insert fields',
    description: 'Insert dynamic fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async createDirectory(
    @Param('path') path: string,
    @Param('dirname') dirname: string,
  ): Promise<any> {
    //const jsonData = JSON.parse(data);
    if (!fs.existsSync(`${pathconfig.FilePath}/${path}/${dirname}`)) {
      fs.mkdirSync(`${pathconfig.FilePath}/${path}/${dirname}`);
    }
  }

  //Delete directory
  @Delete('deletedirectory/:dirname')
  @ApiRoute({
    summary: 'Insert fields',
    description: 'Insert dynamic fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async deleteDirectory(@Param('dirname') dirname: string) {
    //const jsonData = JSON.parse(data);
    if (fs.existsSync(`${pathconfig.FilePath}/${dirname}`)) {
      fs.rmdirSync(`${pathconfig.FilePath}/${dirname}`, {
        recursive: true,
      });
    }
  }

  //Read File inside a directory
  @Get('readfile/:path/:location/:filename')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getFormLayoutFile(
    @Param('path') path: string,
    @Param('location') location: string,
    @Param('filename') filename: string,
  ): Promise<JSON> {
    const readFile = fs.readFileSync(
      `${pathconfig.FilePath}/${path}/${location}/${filename}.json`,
      'utf8',
    );
    const jsonData = JSON.parse(readFile);
    return jsonData;
  }

  //Write file inside directory
  @Post('writefile/:path/:location/:filename')
  @ApiRoute({
    summary: 'Insert fields',
    description: 'Insert dynamic fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async createForm(
    @Param('path') path: string,
    @Param('location') location: string,
    @Param('filename') filename: string,
    @Body() body: object,
  ): Promise<string> {
    //const jsonData = JSON.parse(data);
    const writeFile = JSON.stringify(body);
    if (!fs.existsSync(`${pathconfig.FilePath}/${path}/${location}`)) {
      fs.mkdirSync(`${pathconfig.FilePath}/${path}/${location}`);
    }
    fs.writeFileSync(
      `${pathconfig.FilePath}/${path}/${location}/${filename}.json`,
      writeFile,
    );
    return writeFile;
  }
}
