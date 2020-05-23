import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entitiy';

@Entity({name: 'events'})
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @ManyToOne(type => User, user => user.events)
  user: User
}