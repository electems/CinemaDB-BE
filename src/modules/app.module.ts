/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerMiddleware } from '@decorators/logging.interceptor';

import { RegistrationModule } from './registration/registration.module';
import { UsersModule } from './users/user/users.module';

@Module({
  imports: [UsersModule, RegistrationModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
