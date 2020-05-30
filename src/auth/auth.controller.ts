import { Controller, Post, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpDTO, SignInDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body(ValidationPipe) credentials: SignInDTO) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  signup(@Body(ValidationPipe) credentials: SignUpDTO) {
    return this.authService.signUp(credentials);
  }
}
