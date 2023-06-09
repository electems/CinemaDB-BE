import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { Util } from '@modules/common/util';
import { FormManagerService } from '@modules/formmanager/formmanager.service';

import { PublicController } from './public.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController, PublicController],
  providers: [UsersService, Util, FormManagerService],
  exports: [UsersService],
})
export class UsersModule {}
