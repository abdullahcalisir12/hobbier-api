import { Controller, Get, Post, Delete, Param, UseGuards, Body, Request, Patch, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventDTO, UpdateEventDTO } from './event.dto';

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
  createEvent(@Body(ValidationPipe) body: CreateEventDTO, @Request() req): Promise<Event> {
    return this.eventService.createEvent(body);
  }

  @Patch(':event_id')
  updateEvent(@Body() body: UpdateEventDTO, @Request() req, @Param() params) {
    return this.eventService.updateEvent(+params.event_id, req.user, body);
  }

  @Delete(':event_id')
  deleteEvent(@Param() params, @Request() req) {
    return this.eventService.deleteEvent(+params.event_id, req.user);
  }
}
