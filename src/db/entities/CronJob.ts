import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

@Entity()
export class CronJob extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // The key is used to identify the cron job
  @Column()
  key: string

  // The name of the cron job
  @Column()
  name: string

  // The cron expression
  @Column()
  cron: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}