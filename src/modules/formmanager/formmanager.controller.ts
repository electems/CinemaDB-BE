import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Form, FormElements, FormOptions } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';
import { JwtAuthGuard } from '@modules/users/auth/guards/jwt.auth-guard';

import { RegistrationService } from './formmanager.service';

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
    //const jsonData = JSON.parse(data);
    return this.registrationService.createFormLayout(
      language,
      formlayout,
      body,
    );
  }

  @Post()
  @ApiRoute({
    summary: 'Create Form',
    description: 'Create new form',
    ok: { type: 'json', description: 'New form fields' },
  })
  async createForm(@Body() body: Form): Promise<Form> {
    return this.registrationService.createForm(body);
  }

  @Post('formElements')
  @ApiRoute({
    summary: 'Create FormElements',
    description: 'Create new FormElements',
    ok: { type: 'json', description: 'New FormElements fields' },
  })
  async createFormElements(@Body() body: FormElements): Promise<FormElements> {
    return this.registrationService.createFormElements(body);
  }

  @Post('formOptions')
  @ApiRoute({
    summary: 'Create FormOptions',
    description: 'Create new FormOptions',
    ok: { type: 'json', description: 'New FormOptions fields' },
  })
  async createFormOptions(@Body() body: FormOptions): Promise<FormOptions> {
    return this.registrationService.createFormOptions(body);
  }

  @Get('singleform/getform/:id')
  async findOneForm(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Form | null> {
    return this.registrationService.getFormbyId(id);
  }
}
