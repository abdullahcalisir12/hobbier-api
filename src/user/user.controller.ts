import { Controller, Get, UseGuards, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entitiy";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:user_id')
  getUserById(@Param() params): Promise<User> {
    return this.userService.getSingleUser({ id: +params.user_id });
  }

  @Delete('/:user_id')
  deleteUser(@Param() params): Promise<any> {
    return this.userService.deleteUser(params.user_id);
  }
 }