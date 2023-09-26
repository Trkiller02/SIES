import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.enableShutdownHooks();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000, () =>
    console.log('🚀 Server ready at: http://localhost:8000/api'),
  );
}
bootstrap();
