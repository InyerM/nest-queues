import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageProducerService } from './message.producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageProducerService: MessageProducerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('invoke-msg') // http://localhost:3000/invoke-msg?msg=hello
  getInvokeMsg(@Query('msg') msg: string) {
    this.messageProducerService.sendMessage(msg); // calling the producer service to send a message
    return msg;
  }
}
