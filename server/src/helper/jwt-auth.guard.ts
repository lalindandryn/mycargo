import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new UnauthorizedException('Invalid or missing token.');
    }
    return user;
  }
}

// how to use:
// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

// @Controller('users')
// export class UsersController {
//   @UseGuards(JwtAuthGuard)
//   @Get()
//   findAll() {
//     // Hanya pengguna dengan token yang valid yang bisa mengakses ini
//     return 'Protected data';
//   }
// }
