// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as express from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Truy cập vào source BE
//   app.use('/public', express.static('public'));

//   // Thiết lập CORS
//   app.enableCors();

//   // Cấu hình Swagger
//   const options = new DocumentBuilder()
//     .setTitle('Capstone_airbnb')
//     .setDescription('Bài tập cuối khóa')
//     .setVersion('1.0')
//     .addBearerAuth() // Thêm xác thực Bearer Token
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('swagger', app, document);

//   await app.listen(8080);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Truy cập vào source BE
  app.use('/public', express.static('public'));

  // Thiết lập CORS
  app.enableCors();

  // Cấu hình Swagger
  const options = new DocumentBuilder()
    .setTitle('Capstone_airbnb')
    .setDescription('Bài tập cuối khóa')
    .setVersion('1.0')
    .addBearerAuth() // Thêm xác thực Bearer Token
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // Sử dụng file CSS tùy chỉnh
  app.use('/swagger-ui.css', express.static('path/to/swagger-custom.css'));

  await app.listen(8080);
}

bootstrap();
