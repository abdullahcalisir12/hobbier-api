import { Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';


@Module({
  imports: [TypeOrmModule.forFeature([Participant]), UserModule, EventModule],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipiantsModule {};