import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { UserFormController } from './userformdata.controller';
import { UserFormService } from './userformdata.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserFormController],
  providers: [UserFormService],
  exports: [UserFormService],
})
export class userFormModule {}
