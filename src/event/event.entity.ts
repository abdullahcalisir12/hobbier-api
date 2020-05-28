import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entitiy';
import { AbstractEntity } from 'src/shared/abstract-entity';
import { Participant } from 'src/participant/participant.entity';

@Entity({name: 'events'})
export class Event extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @ManyToOne(type => User, user => user.events)
  user: User

  @OneToMany(type => Participant, participant => participant.event)
  participants: Participant[];
}