import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Expenses API')
    .setDescription('The API for the Expenses Calculator')
    .addBearerAuth()
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
