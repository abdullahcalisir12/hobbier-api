import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId
    }
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  signUp() {
    return 'Sign Up';
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}


// To do => use bcrypt later