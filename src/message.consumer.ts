import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

/** The MessageConsumer class is a processor that processes the 
 * message-job and cron-message-job jobs 
 * */
@Processor('message-queue')
export class MessageConsumer {
  // A decorator that is used to process the message-job.
  @Process('message-job')
  async processMessage(job: Job<unknown>) {
    console.log(job.data);
  }

  // Processing the cron-message-job.
  @Process('cron-message-job')
  async processCronMessage(job: Job<unknown>) {
    console.log(job.data);
  }

  // A decorator that is used to manage a listener for the active event.
  @OnQueueActive()
  onActive(job: Job<unknown>) {
    console.log(`Processing job ${job.id} of type ${job.name}. Data: ${job.data}`);
  }

  // A decorator that is used to manage a listener for the completed event.
  @OnQueueCompleted()
  onComplete(job: Job<unknown>) {
    console.log(`Job ${job.id} of type ${job.name} completed`);
  }
}
