import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvents(): {}[] {
    return this.eventService.getEvents();
  }

  @Get(':event_id')
  getEventById(@Param() params): {} {
    return this.eventService.getEventById(+params.event_id);
  }

  @Post()
  createEvent(): {} {
    const newEvent = {
      name: 'Swimming',
      address: 'Poland'
    }
    return this.eventService.createEvent(newEvent);
  }

  @Delete()
  deleteEvent(): {}[] {
    return this.eventService.deleteEvent(1);
  }
}
