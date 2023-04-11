import { Module } from '@nestjs/common';

import { DatabaseModule } from '@modules/database/database.module';
import { AuthModule } from '@modules/users/auth/auth.module';

import { FormController } from './formmanager.controller';
import { RegistrationService } from './formmanager.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [FormController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
