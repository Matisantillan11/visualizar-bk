import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cors config
  app.enableCors({
    origin: '*',
  });
  //pipes
  app.useGlobalPipes(new ValidationPipe());

  //swager config
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder().setTitle('Visualizar API').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
  });
}

bootstrap();
