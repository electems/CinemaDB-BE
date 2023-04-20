/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-var */
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
    path: string,
    formlayout: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: object,
  ): Promise<string> {
    const jsondata = JSON.stringify(body);
    if (!fs.existsSync(`${pathconfig.FilePath}/${path}`)) {
      fs.mkdirSync(`${pathconfig.FilePath}/${path}`);
    }
    fs.writeFileSync(
      `${pathconfig.FilePath}/${path}/${formlayout}.json`,
      jsondata,
    );
    return jsondata;
  }
}
