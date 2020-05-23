import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
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
  signup(@Body() body) {

    const user = {
      username: body.username,
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: body.password,
    };
    
    return this.authService.signUp(user);
  }
}
