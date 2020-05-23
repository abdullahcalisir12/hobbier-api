import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import { Event } from '../event/event.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Event, event => event.user)
  events?: Event[];
}