/* eslint-disable prettier/prettier */
import path from 'path';

import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import emailConfig from '../config/emailconfig.json';

const transporter = nodemailer.createTransport({
  host: 'mail.electems.com',
  port: 465,
  secure: true,
  auth: {
    user: emailConfig.emailAuthUser,
    pass: emailConfig.emailAuthPass,
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      partialsDir: path.join(__dirname, emailConfig.templatesFilePath),
      layoutsDir: path.join(__dirname, emailConfig.templatesFilePath),
      defaultLayout: '',
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    },
    viewPath: path.join(__dirname, emailConfig.templatesFilePath),
    extName: '.html',
  }),
);

export default transporter;
