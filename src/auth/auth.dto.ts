import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class SignInDTO {

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

}

export class SignUpDTO extends SignInDTO {

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  surname: string;

  @IsEmail()
  @IsString()
  email: string;
}

export class AuthDTO {
  username: string;
}