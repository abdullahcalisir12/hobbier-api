import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvents(): Promise<Event[]> {
    return this.eventService.getEvents();
  }

  @Get(':event_id')
  getEventById(@Param() params): Promise<Event> {
    return this.eventService.getEventById(+params.event_id);
  }

  @Post()
  createEvent(): {} {
    const newEvent = {
      name: 'Swimming',
      address: 'Poland',
      description: 'Swimming'
    }
    return this.eventService.createEvent(newEvent);
  }

  @Delete(':event_id')
  deleteEvent(@Param() params) {
    return this.eventService.deleteEvent(+params.event_id);
  }
}
