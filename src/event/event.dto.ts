import { IsString, MaxLength, MinLength, IsNumber, IsNumberString } from "class-validator";
import { User } from "src/user/user.entitiy";

export class CreateEventDTO {
  
  @IsString()
  @MaxLength(64)
  @MinLength(4)
  name: string;

  @IsString()
  @MaxLength(140)
  @MinLength(32)
  description: string;

  @IsString()
  location: string;

  @IsNumberString()
  user: User;
}

export class UpdateEventDTO extends CreateEventDTO {
  @IsNumberString()
  id: number;
}