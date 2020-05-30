import { Entity, Column, OneToMany, BeforeInsert } from "typeorm";
import { Event } from '../event/event.entity';
import { Participant } from "src/participant/participant.entity";

import { AbstractEntity } from '../shared/abstract-entity';
import { IsEmail } from "class-validator";
import { Exclude, classToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity({name: 'users'})
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({unique: true})
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({default: ''})
  bio: string;

  @Column({default: null, nullable: true})
  image: string | null;

  @OneToMany(type => Event, event => event.user)
  events?: Event[];

  @OneToMany(type => Participant, participant => participant.user)
  participants?: Participant[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
