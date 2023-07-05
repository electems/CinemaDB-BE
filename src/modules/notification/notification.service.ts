/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';

import { DatabaseService } from '@database/database.service';

import emailConfig from '../../config/emailconfig.json';
import transport from '../../config/emialConfiguration';
@Injectable()
export class NotificationService {
  constructor(private db: DatabaseService) {}

  public async createNotification(noticationData: any) {
    const status = 'NEW';
    const notification = {} as Notification;
    (notification.notificationType = noticationData.notificationType),
      (notification.email = noticationData.email),
      (notification.status = status),
      (notification.content = noticationData.content),
      (notification.tableId = noticationData.tableId),
      (notification.userType = noticationData.userType);
    return this.saveNotification(notification);
  }

  public async saveNotification(notificationData: any): Promise<Notification> {
    const notificationRecord = await this.db.notification.create({
      data: notificationData,
    });
    return notificationRecord;
  }

  public async fetchAllNotifications(): Promise<void> {
    const notifications = await this.db.notification.findMany({
      where: {
        NOT: {
          status: {
            startsWith: 'SENT',
          },
        },
      },
    });
    await this.sendNotificationBasedOnStatus(notifications);
  }

  public async sendNotificationBasedOnStatus(
    notificationData: Notification[],
  ): Promise<void> {
    for (let i = 0; i <= notificationData.length - 1; i++) {
      const email = notificationData[i].email!;
      const emailBody = {
        from: emailConfig.fromEmailAddress,
        to: email,
        subject: '',
        template: '',
        context: {},
      };
      if (notificationData[i].notificationType === 'FILM INSTITUTE TRAINING') {
        emailBody.subject = emailConfig.registredFilmInstituteSubject;
        emailBody.template = emailConfig.filmInstituteTemplate;
        emailBody.context = {
          userData: notificationData[i],
        };
        transport.sendMail(emailBody, (error) => {
          error;
          this.updateNotificationStatus(error, notificationData);
        });
      }
    }
  }

  public async updateNotificationStatus(
    error: any,
    notificationData: any,
  ): Promise<void> {
    if (error != undefined || error === null) {
      notificationData[0].status = 'SENT';
      await this.db.notification.update({
        where: { id: notificationData[0].id },
        data: notificationData[0],
      });
    } else {
      console.log('email is not sent for ' + notificationData[0].email);
    }
  }

  public async fetchAllNotificationsBasedOnAudition(
    tableId: number,
  ): Promise<any> {
    const notifications = await this.db.notification.findMany({
      where: {
        AND: [
          {
            tableId: tableId,
            notificationType: 'Apply For Audition Call'
          },
        ],
      },
    });
    return notifications;
  }

  public async fetchAllNotificationsOfFilmInstitute(
    tableId: number,
    userType:string
  ): Promise<any> {
    if(userType === 'PERSON'){
      return  this.db.notification.findMany({
      where: {
        AND: [
          {
            tableId:{
              equals:tableId
            },
            notificationType:{
              contains:'FILM INSTITUTE TRAINING'
            },
            userType:{
              equals:userType
            },

          },
        ],
      },
    });
  }
  else{
    return this.db.notification.findMany({
      where: {
        AND: [
          {
              tableId:{
                equals:tableId
              },
              notificationType:{
                contains:'FILM INSTITUTE TRAINING'
              },
              userType:{
                equals:userType
              },
          },
        ],
      },
    });
  }
  }
}
