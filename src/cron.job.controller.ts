import {
  Controller,
  Query,
  Post,
  Body,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { CronJobService } from './cron.job.service';

/**
 * It's a controller that exposes endpoints for adding, updating, removing,
 * and getting cron jobs
 * */
@Controller('cron-job')
export class CronJobController {
  constructor(private readonly cronJobService: CronJobService) {}

  /** A POST request to the endpoint /cron-job. It is expecting a body with the 
   * following properties: data, cron, name. It is then calling the addCronJob 
   * method in the cronJobService. 
   * */
  @Post()
  async addCronJob(@Body() body: any) {
    const { data, cron, name } = body;
    await this.cronJobService.addCronJob(data, cron, name);
    return {
      ok: true,
    };
  }

 /** A PUT request to the endpoint /cron-job. It is expecting a body with the 
  * following properties: key, data, cron, name. It is then calling the
  *  updateCronJob method in the cronJobService. 
  * */
  @Put()
  async updateCronJob(@Body() body: any) {
    const { key, data, cron, name } = body;
    await this.cronJobService.updateCronJob(key, data, cron, name);
    return {
      ok: true,
    };
  }

  /** A DELETE request to the endpoint /cron-job. It is expecting a query 
   * parameter called key. It is then calling the removeCroneJob method
   * in the cronJobService. 
   * */
  @Delete()
  async removeCronJob(@Query('key') key: string) {
    await this.cronJobService.removeCroneJob(key);
    return {
      ok: true,
    };
  }

  /** A POST request to the endpoint /cron-job/remove-all. It is then 
   * calling the removeAllCronJobs method in the cronJobService. 
   * */
  @Post('remove-all')
  async removeAllCronJobs() {
    await this.cronJobService.removeAllCronJobs();
    return {
      ok: true,
    };
  }

  /** A GET request to the endpoint /cron-job. It is then calling the 
   * getCronJobs method in the cronJobService. 
   * */
  @Get()
  async getCronJobs() {
    return await this.cronJobService.getCronJobs();
  }
}
