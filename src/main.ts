import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from "dotenv";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('SWAPI')
      .setDescription('The Star Wars API')
      .setVersion('1.0')
      .addTag('swapi')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
