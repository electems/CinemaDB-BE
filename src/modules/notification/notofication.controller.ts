import {  Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';

import { NotificationService } from '@modules/notification/notification.service';
@Controller('notifications')
@ApiTags('Film-Training-Institute')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}


  @Post('sendmail')
  @ApiRoute({
    summary: 'Send mails',
    description: 'sends mail for users',
    badRequest: {},
  })
  async sendEmailForUsers(): Promise<void> {
    await this.notificationService.fetchAllNotifications();
  }

}
