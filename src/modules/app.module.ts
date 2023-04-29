import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';

import { LoggerMiddleware } from '@decorators/logging.interceptor';

import { EmailService } from './emails/email.service';
import { EventListnerService } from './eventmanager/eventmanager.service';
import { UsersModule } from './users/user/users.module';
import{FormManagerModule} from './formmanager/formmanager.module'

@Module({
  imports: [
    UsersModule,

    EventEmitterModule.forRoot({}),
    MailerModule,
    PassportModule,
    FormManagerModule
  ],
  controllers: [],
  providers: [EventListnerService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
