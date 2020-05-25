import { Injectable, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO, SignInDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async signIn(credentials: SignInDTO) {
    try {
      return {
        access_token: this.jwtService.sign(credentials)
      };
    } catch (error) {
      throw InternalServerErrorException;
    } 
  }

  signUp(credentials: SignUpDTO): Promise<any> {
    try {
      return this.userService.createUser(credentials);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username is already been taken');
      }
      throw InternalServerErrorException;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getSingleUser({username});

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}


// To do => use bcrypt later