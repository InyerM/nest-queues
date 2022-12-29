import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

// It's a service that sends messages to a queue
@Injectable()
export class MessageProducerService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  /**
   * It adds a job to the queue
   * @param {string} message - string - The message to send
   */
  async sendMessage(message: string) {
    await this.queue.add('message-job', {
      text: message,
    });
  }
}
