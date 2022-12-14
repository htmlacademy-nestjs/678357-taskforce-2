import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@taskforce/shared-types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, NEW_TASK_SUBSCRIBER_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: subscriber.name,
        email: subscriber.email
      }
    })
  }

  public async sendNotifyNewTask(subscriber: Subscriber, {taskAmount}) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: NEW_TASK_SUBSCRIBER_SUBJECT,
      template: './send-task',
      context: {
        user: subscriber.name,
        amount: taskAmount
      }
    })
  }
}
