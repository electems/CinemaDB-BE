import { Module } from '@nestjs/common';

import { RegistrationModule } from './registration/registration.module';
import { UsersModule } from './users/user/users.module';

@Module({
  imports: [UsersModule, RegistrationModule],
})
export class AppModule {}
