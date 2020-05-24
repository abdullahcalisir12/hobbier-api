import { Controller, Get, Post, Delete, Param, UseGuards, Body, Request, Patch } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  createEvent(@Body() body, @Request() req): Promise<Event> {
    const newEvent = {
      name: body.name,
      address: body.address,
      description: body.description,
      user: req.user
    }
    
    return this.eventService.createEvent(newEvent);
  }

  @Patch(':event_id')
  updateEvent(@Body() body, @Request() req, @Param() params) {
    return this.eventService.updateEvent(+params.event_id, req.user, body);
  }

  @Delete(':event_id')
  deleteEvent(@Param() params, @Request() req) {
    return this.eventService.deleteEvent(+params.event_id, req.user);
  }
}
