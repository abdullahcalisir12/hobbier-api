import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entitiy';
import { SignUpDTO } from 'src/auth/auth.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getSingleUser(uniqueUserCredential): Promise<User | undefined> {
    return this.userRepository.findOne(uniqueUserCredential);
  }

  createUser(user: SignUpDTO) {
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne(userId);
    this.userRepository.remove(user);
  }
}