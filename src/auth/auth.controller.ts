import { Controller, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('signup')
  signup() {
    return this.authService.signUp();
  }
}
