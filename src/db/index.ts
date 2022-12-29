import { DataSource } from 'typeorm' 

import { CronJob } from './entities'
import * as dotenv from 'dotenv'

dotenv.config()

/**
 *  Creating a new DataSource object loaded with 
 * .env variables. Check the .env.example file for more details. 
 * */ 
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "postgres",
  database: process.env.PG_DATABASE || "postgres",
  entities: [CronJob],
  synchronize: true,
  logging: false
})

export {
  CronJob
}