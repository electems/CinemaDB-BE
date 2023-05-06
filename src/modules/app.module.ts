import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';

import { LoggerMiddleware } from '@decorators/logging.interceptor';

import { EmailService } from './emails/email.service';
import { EventListnerService } from './eventmanager/eventmanager.service';
import { FormManagerModule } from './formmanager/formmanager.module';
import { userFormModule } from './userprofession/userprofession.module';
import { UsersModule } from './users/user/users.module';

@Module({
  imports: [
    UsersModule,
    userFormModule,
    EventEmitterModule.forRoot({}),
    MailerModule,
    PassportModule,
    FormManagerModule,
  ],
  controllers: [],
  providers: [EventListnerService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
