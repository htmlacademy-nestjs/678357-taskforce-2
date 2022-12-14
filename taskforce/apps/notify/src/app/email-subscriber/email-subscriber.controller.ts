import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@taskforce/shared-types';
import { Controller } from '@nestjs/common';
import { TaskNotifyDto } from './dto/task-notify.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) {}

  @EventPattern({cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({cmd: CommandEvent.SendTask})
  public async sendNewTasks(task: TaskNotifyDto) {
    return this.subscriberService.sendNotifySubscribers(task);
  }
}
