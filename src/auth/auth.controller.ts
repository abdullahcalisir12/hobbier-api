import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin() {
    return this.authService.signIn();
  }

  @Post('signup')
  signup() {
    return this.authService.signUp();
  }
}
