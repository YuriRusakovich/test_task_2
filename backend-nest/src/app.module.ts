import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from '@controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
