import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  // CONFIG SWAGGER DOC

  const config = new DocumentBuilder()
    .setTitle('SIES REST-API')
    .setDescription('SIES rest-api backend')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/open-docs', app, document);

  await app.listen(8000, () =>
    console.log('🚀 Server ready at: http://localhost:8000/api'),
  );
}

bootstrap();
