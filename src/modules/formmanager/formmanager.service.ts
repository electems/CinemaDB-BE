import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { Form, FormElements, FormOptions } from '@prisma/client';
import jsonList from 'src/forms/EN/registration.json';

import { DatabaseService } from '@modules/database/database.service';

import pathconfig from '../../config/pathconfig.json';

@Injectable()
export class RegistrationService {
  jsonList = jsonList;

  constructor(private db: DatabaseService) {}

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

  async createForm(form: Form): Promise<Form> {
    const formData = await this.db.form.create({
      data: form,
    });
    return formData;
  }

  async createFormElements(formElement: FormElements): Promise<FormElements> {
    const formElementData = await this.db.formElements.create({
      data: { ...formElement },
    });
    return formElementData;
  }

  async createFormOptions(formOptions: FormOptions): Promise<FormOptions> {
    const formData = await this.db.formOptions.create({
      data: { ...formOptions },
    });
    return formData;
  }

  async getFormbyId(id: number): Promise<Form | null> {
    const formById = this.db.form.findFirst({
      where: {
        id,
      },
      include: { FormElements: { include: { FormOptions: true } } },
    });
    return formById;
  }
}
