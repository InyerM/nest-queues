import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CronJob } from './db';

// This class is used to add, remove, and update cron jobs.
@Injectable()
export class CronJobService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  /**
   * It removes a cron job from the database and from the queue
   * @param {string} key - The unique key for the cron job
   */
  async removeCroneJob(key: string) {
    const jobs = await this.queue.getRepeatableJobs();
    const job = jobs.find((job) => job.key === key);
    if (job) await this.queue.removeRepeatableByKey(job.key);
    await CronJob.delete({ key });
  }

  /**
   * This function adds a cron job to the queue.
   * @param {any} data - any - the data you want to pass to the job
   * @param {string} cron - The cron expression.
   * @param {string} name - The name of the job.
   */
  async addCronJob(data: any, cron: string, name: string) {
    await this.queue.add(name, data, {
      repeat: {
        cron,
        tz: 'America/Los_Angeles',
      },
    });

    await this.updateCronJobs();
  }

  /**
   * It removes the cron job with the given key and then adds a new cron 
   * job with the given data, cron and name
   * @param {string} key - The key of the cron job you want to update.
   * @param {any} data - The data you want to pass to the function
   * @param {string} cron - The cron expression
   * @param {string} name - The name of the cron job
   */
  async updateCronJob(key: string, data: any, cron: string, name: string) {
    await this.removeCroneJob(key);
    await this.addCronJob(data, cron, name);
  }

  /**
   * It removes all the cron jobs from the database and then removes all 
   * the cron jobs from the queue
   */
  async removeAllCronJobs() {
    const jobs = await this.queue.getRepeatableJobs();
    jobs.forEach(async (job) => {
      await this.queue.removeRepeatableByKey(job.key);
    });
    await CronJob.delete({});
  }

  /**
   * It gets the cron jobs from the queue and returns them
   * @returns An array of cron jobs.
   */
  async getCronJobs() {
    await this.updateCronJobs();
    return await this.queue.getRepeatableJobs();
  }

  /**
   * It gets all the repeatable jobs from the queue, and if there are none, 
   * it deletes all the cron jobs from the database. If there are repeatable 
   * jobs, it loops through them and creates a new cron job for each one.
   * @returns The return value of the function is the return value of the last 
   * statement executed in the function.
   */
  async updateCronJobs() {
    const jobs = await this.queue.getRepeatableJobs();
    if (jobs.length === 0) return await CronJob.delete({});
    jobs.forEach(async ({ key, name, cron }) => {
      const job = await CronJob.findOneBy({ key });

      if (job) return;
      await CronJob.create({
        name,
        cron,
        key,
      }).save();
    });
  }
}
