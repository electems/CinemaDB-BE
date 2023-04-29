import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from '@prisma/client';

import { EmailService } from '../emails/email.service';

export interface OTPPayload {
  user: User;
  otp: string;
}

@Injectable()
export class EventListnerService {
  constructor(
    private eventEmitter: EventEmitter2,
    private emailService: EmailService,
  ) {}

  @OnEvent('email.registration', { async: true })
  handleLoginEmail(payload: OTPPayload): void {
    this.emailService.loginEmail(payload);
  }

  emitEvent(payload: OTPPayload): void {
    this.eventEmitter.emit('email.registration', payload);
  }
}
