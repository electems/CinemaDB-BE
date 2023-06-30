import { Module } from '@nestjs/common';

import { DatabaseService } from '@modules/database/database.service';

import { NotificationController } from './notofication.controller';
import { NotificationService } from '@modules/notification/notification.service';
@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [ DatabaseService, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
