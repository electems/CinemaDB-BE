/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FilmFestival } from '@prisma/client';

import { ApiRoute } from '@decorators/api-route';

import { FilmFestivalService } from './filmfestival.service';
@Controller('filmfestival')
export class FilmFestivalController {
  constructor(private readonly filmFestival: FilmFestivalService) {}

  @Post('createfilmfestival')
  @ApiRoute({
    summary: 'Create a user',
    description: 'Creates a new user',
    badRequest: {},
  })
  async createUser(@Body() filmFestival: FilmFestival): Promise<FilmFestival> {
    return this.filmFestival.createFilmFestival(filmFestival);
  }

  @Get(':id')
  @ApiRoute({
    summary: 'Get user',
    description: 'Retrieves  user',
  })
  async getUserForm(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.filmFestival.getFilmFestivalById(id);
  }

  @Get()
  @ApiRoute({
    summary: 'Get all users',
    description: 'Retrieves all the users',
  })
  async getAllFilmFestivalUsers(): Promise<Array<FilmFestival>> {
    return this.filmFestival.getAllFilmFestivalUsers();
  }
}
