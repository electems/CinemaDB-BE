import { Injectable } from '@nestjs/common';


import emailconfig from '../../config/emailconfig.json';
import transport from '../../config/emialConfiguration';
import { OTPPayload } from '@modules/eventmanager/eventmanager.service';

@Injectable()
export class EmailService {
  loginEmail(payload: OTPPayload): void {
    const emailBody = {
      from: emailconfig.fromEmailAddress,
      to: payload.user.email,
      subject: emailconfig.loginEmailSubject,
      template: emailconfig.loginEmailTemplate,
      context: {
        userData: payload,
      },
    };
    transport.sendMail(emailBody, (error) => {
      error;
    });
  }
}
