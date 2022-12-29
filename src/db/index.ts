import { DataSource } from 'typeorm' 

import { CronJob } from './entities'

/* Creating a new DataSource object. */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1111",
  database: "postgres",
  entities: [CronJob],
  synchronize: true,
  logging: true
})

export {
  CronJob
}