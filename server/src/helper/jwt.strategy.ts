import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as () =>
        | string
        | null,
      secretOrKey: 'paichi',
    };
    super(options);
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}
