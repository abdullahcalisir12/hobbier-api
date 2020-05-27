import { Injectable, InternalServerErrorException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
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

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserById(userId): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserByUserName(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({where: {username}})
      .catch(error => {
        throw new NotFoundException();
      });
    return user;
  }

  async createUser(userDto: SignUpDTO): Promise<User> {
    const { email, username } = userDto;
    let user = await this.userRepository.findOne({where: [{email}, {username}]});

    if (user) {
      throw new BadRequestException('E-mail or username is already in use');
    }
    user = await this.userRepository.create(userDto);
    return this.userRepository.save(user)
      .catch(error => {
        throw new InternalServerErrorException(error);
      });
  }

  async deleteUser(userId: number) {
    try {
      const user = await this.userRepository.findOne(userId);
      if (user) {
        return this.userRepository.remove(user);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}