import fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Form, FormElements, FormOptions } from '@prisma/client';
import jsonList from 'src/forms/EN/registration.json';

import { DatabaseService } from '@modules/database/database.service';

import pathconfig from '../../config/pathconfig.json';

@Injectable()
export class FormManagerService {
  jsonList = jsonList;

  constructor(private db: DatabaseService) {}

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

  async createForm(form: any): Promise<Form> {
    const formData = await this.db.form.create({
      data: {
        ...form,
        FormElements: {
          create: form.FormElements,
        },
      },
      include: { FormElements: { include: { FormOptions: true } } },
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

  async getFormElementById(id: number): Promise<FormElements | null> {
    const formById = this.db.formElements.findFirst({
      where: {
        id,
      },
      include: { FormOptions: true },
    });
    return formById;
  }

  async getFormOptionsById(id: number): Promise<FormOptions | null> {
    const formById = this.db.formOptions.findFirst({
      where: {
        id,
      },
    });
    return formById;
  }

  async updateFormbyId(id: number, form: any): Promise<Form> {
    const existingForm = await this.getFormbyId(id);
    if (!existingForm) {
      throw new NotFoundException();
    }
    return this.db.form.update({
      where: { id },
      data: {
        ...form,
        FormElements: {
          update: form.FormElements,
        },
      },
    });
  }

  async updateFormElementsById(
    id: number,
    formElement: FormElements,
  ): Promise<FormElements> {
    const existingUser = await this.getFormElementById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }

    return this.db.formElements.update({
      where: { id },
      data: formElement,
    });
  }

  async updateFormOptions(
    id: number,
    formOptions: FormOptions,
  ): Promise<FormOptions> {
    const existingUser = await this.getFormOptionsById(id);
    if (!existingUser) {
      throw new NotFoundException();
    }

    return this.db.formOptions.update({
      where: { id },
      data: formOptions,
    });
  }

  async deleteFormById(id: number): Promise<Form> {
    const form = await this.getFormbyId(id);
    if (!form) {
      throw new NotFoundException();
    }

    return this.db.form.delete({
      where: {
        id,
      },
      include: { FormElements: { include: { FormOptions: true } } },
    });
  }

  async deleteFormElementById(id: number): Promise<FormElements> {
    const formElements = await this.getFormElementById(id);
    if (!formElements) {
      throw new NotFoundException();
    }

    return this.db.formElements.delete({
      where: {
        id,
      },
      include: { FormOptions: true },
    });
  }

  async deleteFormOptionsById(id: number): Promise<FormOptions> {
    const formOptions = await this.getFormOptionsById(id);
    if (!formOptions) {
      throw new NotFoundException();
    }

    return this.db.formOptions.delete({
      where: {
        id,
      },
    });
  }
}
