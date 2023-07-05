import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';
import { NotificationService } from '@modules/notification/notification.service';
@Controller('notifications')
@ApiTags('Film-Training-Institute')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('sendmail')
  @ApiRoute({
    summary: 'Send mails',
    description: 'sends mail for users',
    badRequest: {},
  })
  async sendEmailForUsers(): Promise<void> {
    await this.notificationService.fetchAllNotifications();
  }

  @Get('getnotifcationforaudition/:tableId')
  @ApiRoute({
    summary: 'Send mails',
    description: 'sends mail for users',
    badRequest: {},
  })
  async getNotificationByUserId(
    @Param('tableId', new ParseIntPipe()) tableId: number,
  ): Promise<void> {
    await this.notificationService.fetchAllNotificationsBasedOnAudition(
      tableId,
    );
  }

  @Get('getnotifcationforfilminstitute/:tableId/:userType')
  @ApiRoute({
    summary: 'Fetch Film Institute Notifications based on user ID',
    description: 'Fetch Film Institute Notifications based on user ID',
    badRequest: {},
  })
  async fetchAllNotificationsOfFilmInstitute(
    @Param('tableId', new ParseIntPipe()) tableId: number,
    @Param('userType') userType: string,
  ): Promise<void> {
    return this.notificationService.fetchAllNotificationsOfFilmInstitute(
      tableId,userType
    );
  }
}
