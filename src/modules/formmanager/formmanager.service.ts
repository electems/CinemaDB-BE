import fs from 'fs';

import { Injectable } from '@nestjs/common';
import jsonList from 'src/forms/EN/registration.json';

import pathconfig from '../../config/pathconfig.json';

@Injectable()
export class FormManagerService {
  jsonList = jsonList;

  async getFormLayout(language: string, formlayout: string): Promise<string> {
    if (
      fs.existsSync(`${pathconfig.FilePath}/${language}/${formlayout}.json`)
    ) {
      const data = fs.readFileSync(
        `${pathconfig.FilePath}/${language}/${formlayout}.json`,
        'utf8',
      );
      const jsonData = JSON.parse(data);
      return jsonData;
    }
    const obj = { error: 'FILE_NOT_FOUND' };
    return JSON.stringify(obj);
  }

  async createFormLayout(
    path: string,
    formlayout: string,
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
