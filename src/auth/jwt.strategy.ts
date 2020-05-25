import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constant";
import { UserService } from "src/user/user.service";
import { AuthDTO } from "./auth.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: AuthDTO) {
    const { username } = payload;
    const user = await this.userService.getSingleUser({ username });

    if (!user) {
      throw UnauthorizedException;
    }
    return {
      name: user.name,
      username: user.username,
      id: user.id
    }
  }
}