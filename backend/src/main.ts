import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips unknown properties
      forbidNonWhitelisted: true, // Throws an error if unknown properties are present
      disableErrorMessages: false, // turn to true on prod env
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
