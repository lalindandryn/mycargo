import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.userService.validatePassword(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
