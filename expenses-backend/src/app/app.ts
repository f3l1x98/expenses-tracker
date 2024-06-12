import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

export async function initApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  setupApp(app);

  return app;
}

export function setupApp(app: INestApplication): void {
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableVersioning({
    type: VersioningType.URI,
  });
}
