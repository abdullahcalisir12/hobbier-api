import { Controller, Get, UseGuards, Param, Delete, Request, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entitiy";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:user_id')
  getUserById(@Param() params): Promise<User | undefined> {
    return this.userService.getUserById(+params.user_id);
  }

  @Delete('/:user_id')
  deleteUser(@Param() params, @Request() req): Promise<any> {
    if (params.user_id !== req.user.id) {
      throw new UnauthorizedException();
    }
    
    return this.userService.deleteUser(params.user_id);
  }
 }