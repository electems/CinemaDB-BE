import fs from 'fs';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiRoute } from '@decorators/api-route';
import { JwtAuthGuard } from '@modules/users/auth/guards/jwt.auth-guard';

import { FormManagerService } from './formmanager.service';
import pathconfig from '../../config/pathconfig.json';

@UseGuards(JwtAuthGuard)
@Controller('form')
@ApiTags('forms-json')
@ApiBearerAuth()
export class FormsController {
  constructor(private readonly formsService: FormManagerService) {}

  @Get('/:language/:formlayout')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getFormLayout(
    @Param('language') language: string,
    @Param('formlayout') formlayout: string,
  ): Promise<string> {
    return this.formsService.getFormLayout(language, formlayout);
  }

  @Post('/:language/:formlayout')
  @ApiRoute({
    summary: 'Insert fields',
    description: 'Insert dynamic fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async createFormLayout(
    @Param('language') language: string,
    @Param('formlayout') formlayout: string,
    @Body() body: object,
  ): Promise<string> {
    return this.formsService.createFormLayout(language, formlayout, body);
  }

  //List all directories inside Folder
  @Get('/:path')
  @ApiRoute({
    summary: 'Get all fields',
    description: 'Retrieves all fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async getDirectoryListing(@Param('path') path: string): Promise<string[]> {
    const directoriesInDirectory = fs
      .readdirSync(`${pathconfig.FilePath}/${path}`, { withFileTypes: true })
      .filter((item: { isDirectory: () => any }) => item.isDirectory())
      .map((item: { name: string }) => item.name);
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
  ): Promise<void> {
    //const jsonData = JSON.parse(data);
    if (!fs.existsSync(`${pathconfig.FilePath}/${path}/${dirname}`)) {
      fs.mkdirSync(`${pathconfig.FilePath}/${path}/${dirname}`);
    }
  }

  //Delete directory
  @Delete('deletedirectory/:path/:dirname')
  @ApiRoute({
    summary: 'Insert fields',
    description: 'Insert dynamic fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async deleteDirectory(
    @Param('path') path: string,
    @Param('dirname') dirname: string,
  ): Promise<void> {
    //const jsonData = JSON.parse(data);
    if (fs.existsSync(`${pathconfig.FilePath}/${path}/${dirname}`)) {
      fs.rmdirSync(`${pathconfig.FilePath}/${path}/${dirname}`, {
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
  async createFormInsideDirectory(
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
