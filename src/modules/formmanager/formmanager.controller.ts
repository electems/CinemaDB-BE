import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Form, FormElements, FormOptions } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';
import { JwtAuthGuard } from '@modules/users/auth/guards/jwt.auth-guard';
import fs from 'fs';
import pathconfig from '../../config/pathconfig.json';

import { FormManagerService } from './formmanager.service';

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

  @Post()
  @ApiRoute({
    summary: 'Create Form',
    description: 'Create new form',
    ok: { type: 'json', description: 'New form fields' },
  })
  async createForm(@Body() body: Form): Promise<Form> {
    return this.formsService.createForm(body);
  }

  @Post('formElements')
  @ApiRoute({
    summary: 'Create FormElements',
    description: 'Create new FormElements',
    ok: { type: 'json', description: 'New FormElements fields' },
  })
  async createFormElements(@Body() body: FormElements): Promise<FormElements> {
    return this.formsService.createFormElements(body);
  }

  @Post('formOptions')
  @ApiRoute({
    summary: 'Create FormOptions',
    description: 'Create new FormOptions',
    ok: { type: 'json', description: 'New FormOptions fields' },
  })
  async createFormOptions(@Body() body: FormOptions): Promise<FormOptions> {
    return this.formsService.createFormOptions(body);
  }

  @Get('singleform/getform/:id')
  async findOneForm(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Form | null> {
    return this.formsService.getFormbyId(id);
  }

  @Get('getform/formElement/:id')
  async getFormElementById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<FormElements | null> {
    return this.formsService.getFormElementById(id);
  }

  @Get('getform/formOptioins/:id')
  async getFormOptionsById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<FormOptions | null> {
    return this.formsService.getFormOptionsById(id);
  }

  @Put('updateForm/:id')
  @ApiRoute({
    summary: 'Update a form',
    description: 'Modifies a form',
    notFound: { description: "The requested form wasn't found" },
    badRequest: {},
  })
  async updateFormbyId(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() form: Form,
  ): Promise<Form> {
    return this.formsService.updateFormbyId(id, form);
  }

  @Put('updateFormElement/:id')
  @ApiRoute({
    summary: 'Update a FormElements',
    description: 'Modifies a FormElements',
    notFound: { description: "The requested FormElements wasn't found" },
    badRequest: {},
  })
  async updateFormElementsById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() form: FormElements,
  ): Promise<FormElements> {
    return this.formsService.updateFormElementsById(id, form);
  }

  @Put('updateFormOptions/:id')
  @ApiRoute({
    summary: 'Update a formOptions',
    description: 'Modifies a formOptions',
    notFound: { description: "The requested formOptions wasn't found" },
    badRequest: {},
  })
  async updateFormOptions(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() formOptions: FormOptions,
  ): Promise<FormOptions> {
    return this.formsService.updateFormOptions(id, formOptions);
  }

  @Delete('deleteForm/:id')
  @ApiRoute({
    summary: 'Delete a Form',
    description: 'Removes a Form',
    notFound: { description: "The requested Form wasn't found" },
  })
  async deleteFormById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Form> {
    return this.formsService.deleteFormById(id);
  }

  @Delete('deleteFormElement/:id')
  @ApiRoute({
    summary: 'Delete a FormElements',
    description: 'Removes a FormElements',
    notFound: { description: "The requested FormElements wasn't found" },
  })
  async deleteFormElementById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<FormElements> {
    return this.formsService.deleteFormElementById(id);
  }

  @Delete('deleteFormOption/:id')
  @ApiRoute({
    summary: 'Delete a FormOptions',
    description: 'Removes a FormOptions',
    notFound: { description: "The requested FormOptions wasn't found" },
  })
  async deleteFormOptionsById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<FormOptions> {
    return this.formsService.deleteFormOptionsById(id);
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
  @Delete('deletedirectory/:path/:dirname')
  @ApiRoute({
    summary: 'Insert fields',
    description: 'Insert dynamic fields',
    ok: { type: 'json', description: 'The form fields' },
  })
  async deleteDirectory( @Param('path') path: string,@Param('dirname') dirname: string) {
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
