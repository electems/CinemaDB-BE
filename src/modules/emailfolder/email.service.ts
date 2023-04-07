import { Injectable } from '@nestjs/common';

import { LoggedUserDto } from '@modules/users/user/dto/logged-user.dto';

import emailconfig from '../../config/emailconfig.json';
import transport from '../../config/emialConfiguration';

@Injectable()
export class EmailService {
  constructor() {}

  loginEmail(user: LoggedUserDto): void {
    const emailBody = {
      from: emailconfig.fromEmailAddress,
      to: user.email,
      subject: emailconfig.loginEmailSubject,
      template: emailconfig.loginEmailTemplate,
      context: {
        userData: user,
      },
    };
    transport.sendMail(emailBody, (error) => {
      console.log(error);
    });
    console.log(emailBody);
  }
}
