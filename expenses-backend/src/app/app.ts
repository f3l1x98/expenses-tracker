import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger, format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

export async function initApp(): Promise<INestApplication> {
  const loggerInstance = createWinstonLogger();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  return app;
}

function createWinstonLogger() {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.errors(),
      format.colorize(),
    ),
    exitOnError: false,
    transports: [
      new transports.Console({
        handleExceptions: true,
        handleRejections: true,
      }),
    ],
  });
}
