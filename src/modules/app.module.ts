import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';

import { LoggerMiddleware } from '@decorators/logging.interceptor';

import { AuditionCallModule } from './auditioncall/auditioncall.module';
import { EmailService } from './emails/email.service';
import { EventListnerService } from './eventmanager/eventmanager.service';
import { fileModule } from './file/file.module';
import { filmFestivalModule } from './filmfestival/filmfestivalmodule';
import { FormManagerModule } from './formmanager/formmanager.module';
import { userFormModule } from './userprofession/userformdata.module';
import { UsersModule } from './users/user/users.module';
import { FilmTrainingInstituteModule } from './filmtraininginstitute/filmtraininginstitute.module';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    UsersModule,
    userFormModule,
    filmFestivalModule,
    fileModule,
    AuditionCallModule,
    EventEmitterModule.forRoot({}),
    MailerModule,
    PassportModule,
    FormManagerModule,
    FilmTrainingInstituteModule,
    NotificationModule
  ],
  controllers: [],
  providers: [EventListnerService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
