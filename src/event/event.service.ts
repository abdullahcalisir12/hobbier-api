import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EventSubscriber } from 'typeorm';

import { Event } from './event.entity';
import { CreateEventDTO, UpdateEventDTO } from './event.dto';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  getEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  getEventById(eventId: number): Promise<Event> {
    const event = this.eventRepository.findOne({where: {id: eventId}, relations: ["user"]});
    if (!event) {
      throw new NotFoundException('Event Not Found');
    }
    return event;
  }

  async createEvent(event: CreateEventDTO, user): Promise<Event> {
    const newEvent = {
      ...event,
      user: user.id
    }
    return await this.eventRepository.save(newEvent);
  }

  async updateEvent(eventId: number, user, eventData: UpdateEventDTO) {
    const event = await this.getEventById(eventId);

    if (!event) {
      throw new NotFoundException();
    } else if (event.user.id !== user.id) {
      throw new UnauthorizedException();
    } else {
      const newEvent = {
        ...eventData,
        id: eventId
      }
      return this.eventRepository.save(newEvent);
    }
  }

  async deleteEvent(eventId: number, user) {
    const event = await this.eventRepository.findOne({where: { id: eventId, user: {id: user.id} }});
    this.eventRepository.remove(event);
  }
}
