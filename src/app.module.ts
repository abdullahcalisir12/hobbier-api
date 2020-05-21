import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

// To use process.env
import * as dotenv from 'dotenv';
dotenv.config();

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventModule } from './event/event.module';
import { AuthModule } from './auth/auth.module';

import { Event } from './event/event.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_PG_URL,
      synchronize: true,
      entities: [Event],
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    AuthModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
