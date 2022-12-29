import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Trying to connect to the database and if it fails it will log the error.
  try {
    await AppDataSource.initialize()
    console.log('Database is connected')
  }
  catch (error) {
    console.log(error)
  }
  await app.listen(3000);
}
bootstrap();
