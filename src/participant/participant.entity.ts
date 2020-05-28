import { Entity, Column, ManyToOne } from "typeorm";
import { AbstractEntity } from "src/shared/abstract-entity";
import { User } from "src/user/user.entitiy";
import { Event } from "src/event/event.entity";
import { ParticipantType } from "./participant-type.enum";


@Entity({name: 'participants'})
export class Participant extends AbstractEntity {
  @ManyToOne(type => User, user => user.participants)
  user: User;

  @ManyToOne(type => Event, event => event.participants)
  event: Event;

  @Column({
    type: "enum",
    enum: ParticipantType,
    default: ParticipantType.REQUEST_SENT,
})
  participantType: ParticipantType;
}