import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { Util } from '@modules/common/util';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, Util],
  exports: [UsersService],
})
export class UsersModule {}
