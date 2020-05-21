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

  getEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  getEventById(eventId: number): Promise<Event> {
    return this.eventRepository.findOne(eventId);
  }

  createEvent(event: Event) {
    return this.eventRepository.save(event);
  }

  async deleteEvent(eventId) {
    const event = await this.eventRepository.findOne(eventId);
    this.eventRepository.remove(event);
  }
}
