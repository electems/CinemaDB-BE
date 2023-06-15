import { Module } from '@nestjs/common';

import { DatabaseService } from '@modules/database/database.service';

import { AuditionCallController } from './auditioncall.controller';
import { AuditionCallService } from './auditioncall.service';

@Module({
  imports: [],
  controllers: [AuditionCallController],
  providers: [AuditionCallService, DatabaseService],
  exports: [AuditionCallService],
})
export class AuditionCallModule {}
