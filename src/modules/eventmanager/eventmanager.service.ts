import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from '@prisma/client';

import { LoggedUserDto } from '@modules/users/user/dto/logged-user.dto';

import { EmailService } from '../emails/email.service';
@Injectable()
export class EventListnerService {
  constructor(
    private eventEmitter: EventEmitter2,
    private emailService: EmailService,
  ) {}

  @OnEvent('email.registration', { async: true })
  handleLoginEmail(user: LoggedUserDto): void {
    this.emailService.loginEmail(user);
  }

  emitEvent(payload: User): void {
    this.eventEmitter.emit('email.registration', payload);
  }
}
