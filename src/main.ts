import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('hobbier/api/v1');

  const options =  new DocumentBuilder()
    .setTitle('Hobbier API')
    .setDescription('The Hobbier API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('hobbier/api', app, document);


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
