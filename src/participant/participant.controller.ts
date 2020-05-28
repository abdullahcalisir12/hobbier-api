import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/user/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('events/:event_id')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}
  
  @Get('attend-event')
  sendRequestToAttendEvent(@GetUser() user, @Param() params) {
    return this.participantService.sendRequestToAttendEvent(params.event_id, user);
  }

  @Get('cancel-attend-request')
  cancelRequesstToAttendEvent(@GetUser() user, @Param() params) {
    return this.participantService.cancelRequesstToAttendEvent(params.event_id, user);
  }

  @Get('confirm-attend-request')
  confirmAttendRequest(@GetUser() user, @Param() params) {
    return this.participantService.confirmAttendRequest(params.event_id, user);
  }

  @Get('reject-attend-request')
  rejectAttendRequest(@GetUser() user, @Param() params) {
    return this.participantService.rejectAttendRequest(params.event_id, user);
  }
}