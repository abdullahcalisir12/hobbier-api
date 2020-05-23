import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async signIn({username, name, id}) {
      const payload = {
        username,
        name,
        id
      }
      return {
        access_token: this.jwtService.sign(payload)
      };
  }

  signUp(user: any): Promise<any> {
    return this.userService.createUser(user);
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