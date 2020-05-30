import { Controller, Get, Post, Delete, Param, UseGuards, Body, Request, Patch, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEventDTO, UpdateEventDTO } from './event.dto';
import { GetUser } from 'src/user/user.decorator';

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
  createEvent(@Body(ValidationPipe) body: CreateEventDTO, @GetUser() user): Promise<Event> {
    return this.eventService.createEvent(body, user);
  }

  @Patch(':event_id')
  updateEvent(@Body() body: UpdateEventDTO, @GetUser() user, @Param() params) {
    return this.eventService.updateEvent(+params.event_id, user, body);
  }

  @Delete(':event_id')
  deleteEvent(@Param() params, @GetUser() user) {
    return this.eventService.deleteEvent(+params.event_id, user);
  }
}
