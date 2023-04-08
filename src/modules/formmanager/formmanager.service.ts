import fs from 'fs';

import { Injectable } from '@nestjs/common';
import jsonList from 'src/forms/EN/registration.json';

import pathconfig from '../../config/pathconfig.json';

@Injectable()
export class RegistrationService {
  jsonList = jsonList;

  async getFormLayout(language: string, formlayout: string): Promise<JSON> {
    const data = fs.readFileSync(
      `${pathconfig.FilePath}/${language}/${formlayout}.json`,
      'utf8',
    );
    const jsonData = JSON.parse(data);
    return jsonData;
  }

  async createFormLayout(
    language: string,
    formlayout: string,
    body: object,
  ): Promise<string> {
    const jsondata = JSON.stringify(body);
    fs.writeFileSync(
      `${pathconfig.FilePath}/${language}/${formlayout}.json`,
      jsondata,
    );
    return jsondata;
  }
}