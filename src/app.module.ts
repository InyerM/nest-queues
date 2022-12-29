import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MessageProducerService } from './message.producer.service';
import { MessageConsumer } from './message.consumer';
import { CronJobService } from './cron.job.service';
import { CronJobController } from './cron.job.controller';

@Module({
  imports: [
    // Creating a connection for Bull to the redis server. This is the default connection.
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // Registering a queue with the name `message-queue`
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  controllers: [AppController, CronJobController],
  providers: [
    AppService,
    MessageProducerService,  // This is a service that produces messages
    MessageConsumer,         // This is the consumer for the queue `message-queue`
    CronJobService,          // This is a service that manages the cron job
  ],
})
export class AppModule {}
