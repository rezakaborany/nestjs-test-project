import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  await app.listen(process.env.APP_PORT);
  console.log(`app is running at ${process.env.APP_PORT}`)
}
bootstrap();
