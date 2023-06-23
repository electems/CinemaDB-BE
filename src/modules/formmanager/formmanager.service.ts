import fs from 'fs';

import { Injectable, Logger } from '@nestjs/common';
import jsonList from 'src/forms/EN/registration.json';

import pathconfig from '../../config/pathconfig.json';

@Injectable()
export class FormManagerService {
  jsonList = jsonList;

  async getFormLayout(language: string, formlayout: string): Promise<string> {
    Logger.log(
      'Start : FormManagerService  : getFormLayout  : language: ',
      language,
      'formlayout :',
      formlayout,
    );
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
    Logger.log(
      'End : FormManagerService  : getFormLayout  : response: ',
      JSON.stringify(obj),
    );
    return JSON.stringify(obj);
  }

  async createFormLayout(
    path: string,
    formlayout: string,
    body: object,
  ): Promise<string> {
    Logger.log(
      'Start : FormManagerService  : createFormLayout  : path: ',
      path,
      'formlayout :',
      formlayout,
      'body :',
      body,
    );
    const jsondata = JSON.stringify(body);
    if (!fs.existsSync(`${pathconfig.FilePath}/${path}`)) {
      fs.mkdirSync(`${pathconfig.FilePath}/${path}`);
    }
    fs.writeFileSync(
      `${pathconfig.FilePath}/${path}/${formlayout}.json`,
      jsondata,
    );

    Logger.log(
      'End : FormManagerService  : createFormLayout  : response: ',
      jsondata
    );
    return jsondata;
  }
}
