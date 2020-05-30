import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { Repository } from 'typeorm';
import { EventService } from 'src/event/event.service';
import { ParticipantType } from './participant-type.enum';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
    private readonly eventService: EventService
  ) {}
  async sendRequestToAttendEvent(eventId, { id: userId }) {
    const requestedEvent = await this.participantsRepository.findOne({where: {user: userId, event: eventId}});
    if (requestedEvent) {
      throw new ConflictException('You already sent request to this event before');
    }
    const event = await this.eventService.getEventById(eventId);
    let newParticipant = {
      user: userId,
      events: eventId,
      participantType: event.user.id !== userId ? ParticipantType.REQUEST_SENT : ParticipantType.GOING
    }
    return await this.participantsRepository.save(newParticipant);
  }

  async cancelRequesstToAttendEvent(eventId, { id: userId }) {
    const requestedEvent = await this.participantsRepository.findOne({where: {user: userId, event: eventId}});
    if (!requestedEvent) {
      throw new BadRequestException();
    }
    const uodateParticipationRequest = {
      ...requestedEvent,
      participantType: ParticipantType.REQUEST_CANCELLED
    }
    return await this.participantsRepository.save(uodateParticipationRequest);
  }

  async confirmAttendRequest(eventId, { id: userId }) {
    const requestedEvent = await this.participantsRepository.findOne({where: {user: userId, event: eventId}});
    if (!requestedEvent) {
      throw new BadRequestException();
    }
    const uodateParticipationRequest = {
      ...requestedEvent,
      participantType: ParticipantType.REQUEST_ACCEPTED
    }
    return await this.participantsRepository.save(uodateParticipationRequest);
  }

  async rejectAttendRequest(eventId, { id: userId }) {
    const requestedEvent = await this.participantsRepository.findOne({where: {user: userId, event: eventId}});
    if (!requestedEvent) {
      throw new BadRequestException();
    }
    const uodateParticipationRequest = {
      ...requestedEvent,
      participantType: ParticipantType.REQUEST_REJECTED
    }
    return await this.participantsRepository.save(uodateParticipationRequest);
  }
}