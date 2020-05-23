import { Controller, Get, Post, Delete, Param, UseGuards, Body, Request } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvents(@Request() req): Promise<Event[]> {
    return this.eventService.getEvents(req.user);
  }

  @Get(':event_id')
  getEventById(@Param() params, @Request() req): Promise<Event> {
    return this.eventService.getEventById(+params.event_id, req.user);
  }

  @Post()
  createEvent(@Body() body, @Request() req): Promise<Event> {
    const newEvent = {
      name: body.name,
      address: body.address,
      description: body.description,
      user: req.user
    }
    
    return this.eventService.createEvent(newEvent);
  }

  @Delete(':event_id')
  deleteEvent(@Param() params, @Request() req) {
    return this.eventService.deleteEvent(+params.event_id, req.user);
  }
}
