import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import * as express from 'express';
import { join } from 'path';
import 'dotenv/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggerInterceptor());

  app.setGlobalPrefix('api');

  app.use('/uploads', express.static(join(__dirname, '..', 'public/uploads')));

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
