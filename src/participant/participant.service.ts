import { Injectable, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
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
  async sendRequestToAttendEvent(eventId, { id: userId }): Promise<Participant> {
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

  async cancelRequesstToAttendEvent(eventId, { id: userId }): Promise<Participant> {
    const requestedEvent = await this.getParticipatedEvent(eventId, userId)
    const updateParticipationRequest = {
      ...requestedEvent,
      participantType: ParticipantType.REQUEST_CANCELLED
    }
    return await this.participantsRepository.save(updateParticipationRequest);
  }

  async confirmAttendRequest(eventId, { id: userId }): Promise<Participant> {
    const requestedEvent = await this.getParticipatedEvent(eventId, userId)
    const updateParticipationRequest = {
      ...requestedEvent,
      participantType: ParticipantType.REQUEST_ACCEPTED
    }
    return await this.participantsRepository.save(updateParticipationRequest);
  }

  async rejectAttendRequest(eventId, { id: userId }): Promise<Participant> {
    const requestedEvent = await this.getParticipatedEvent(eventId, userId)
    const updateParticipationRequest = {
      ...requestedEvent,
      participantType: ParticipantType.REQUEST_REJECTED
    }
    return await this.participantsRepository.save(updateParticipationRequest);
  }

  async getEventsAttendedByUser(userId): Promise<Participant[]> {
    const eventsAttendedByUser = await this.participantsRepository.find({where: {user: userId}, relations: ["event"]});
    if (!eventsAttendedByUser) {
      throw new InternalServerErrorException();
    }
    return eventsAttendedByUser;
  }

  async getUsersAttendingEvent(eventId): Promise<Participant[]> {
    const usersAttendingEvent = await this.participantsRepository.find({where: {event: eventId}, relations: ["user"]});
    if (!usersAttendingEvent) {
      throw new InternalServerErrorException();
    }
    return usersAttendingEvent;
  }

  async getParticipatedEvent(eventId, userId): Promise<Participant> {
    const requestedEvent = await this.participantsRepository.findOne({where: {user: userId, event: eventId}});
    if (!requestedEvent) {
      throw new BadRequestException();
    }
    return requestedEvent;
  }
}