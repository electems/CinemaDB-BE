import { Module } from '@nestjs/common';

import { DatabaseService } from '@modules/database/database.service';
import { AuthModule } from '@modules/users/auth/auth.module';

import { FormsController } from './formmanager.controller';
import { FormManagerService } from './formmanager.service';

@Module({
  imports: [AuthModule],
  controllers: [FormsController],
  providers: [FormManagerService, DatabaseService],
  exports: [FormManagerService],
})
export class FormManagerModule {}
