/* eslint-disable prettier/prettier */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';

import { LoggerMiddleware } from '@decorators/logging.interceptor';

import { EmailService } from './emailfolder/email.service';
import { EventListnerController } from './eventEmitter/eventlistner.controller';
import { EventListnerService } from './eventEmitter/eventlistner.service';
import { RegistrationModule } from './registration/registration.module';
import { UsersModule } from './users/user/users.module';

@Module({
  imports: [
    UsersModule,
    RegistrationModule,

    EventEmitterModule.forRoot({}),
    MailerModule,
    PassportModule,
  ],
  controllers: [EventListnerController],
  providers: [EventListnerService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
