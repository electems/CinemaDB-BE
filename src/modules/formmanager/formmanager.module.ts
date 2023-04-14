import { Module } from '@nestjs/common';

import { DatabaseModule } from '@modules/database/database.module';
import { AuthModule } from '@modules/users/auth/auth.module';

import { FormsController } from './formmanager.controller';
import { FormsService } from './formmanager.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService],
})
export class FormsModule {}
