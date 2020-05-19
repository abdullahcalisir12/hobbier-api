import { Injectable } from '@nestjs/common';

const events = [
  {
    name: 'Basketball',
    id: 1,
    address: 'Batman'
  },
  {
    name: 'Football',
    id: 2,
    address: 'Mugla'
  },
  {
    name: 'Tennis',
    id: 3,
    address: 'Istanbul'
  }
];

@Injectable()
export class EventService {
  getEvents(): {}[] {
    return events;
  }

  getEventById(eventId) {
    return events.find(event => event.id === eventId)
  }

  createEvent(event): {} {
    event.id = events.length + 1;
    events.push(event);
    return events;
  }

  deleteEvent(eventId) {
    return events.splice(events.findIndex(event => event.id === eventId), 1);
  }
}
