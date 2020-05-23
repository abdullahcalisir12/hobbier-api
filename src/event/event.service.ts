import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from './event.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  getEvents(user): Promise<Event[]> {
    return this.eventRepository.find({ where: { user: { id: user.id }}, relations: ["user"] });
  }

  getEventById(eventId: number, user): Promise<Event> {
    return this.eventRepository.findOne({where: { id: eventId, user: {id: user.id} }});
  }

  createEvent(event: Event) {
    return this.eventRepository.save(event);
  }

  async deleteEvent(eventId: number, user) {
    const event = await this.eventRepository.findOne({where: { id: eventId, user: {id: user.id} }});
    this.eventRepository.remove(event);
  }
}
