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
import { UserModule } from './user/user.module';
import { ParticipiantsModule } from './participant/participant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    AuthModule,
    EventModule,
    UserModule,
    ParticipiantsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
