import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('uploads'));
  app.enableCors({ origin: ['http://localhost:3001', 'http://0.0.0.0:3001'] });
  await app.listen(3000);
}
bootstrap();
