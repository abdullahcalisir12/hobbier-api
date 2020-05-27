import { Injectable, BadRequestException, InternalServerErrorException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO, SignInDTO } from './auth.dto';
import { User } from 'src/user/user.entitiy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async signIn({username, password}: SignInDTO) {
    try {
      const user = await this.validateUser(username, password);
      if (user) {
        return {
          access_token: this.jwtService.sign(user)
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  signUp(credentials: SignUpDTO): Promise<User | undefined> {
    return this.userService.createUser(credentials);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUserName(username);
    if (user) {
      const isPasswordMatched = await user.comparePassword(password);
      if (isPasswordMatched) {
        const { id, name, username} = user;
        return { id, name, username };
      }
    }
    throw new BadRequestException('Invalid Credentials');
  }
}
