import { Body, Controller, Post } from '@nestjs/common';
import {} from 'src/dto/change-password.dto';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.userService.sendResetPassword(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.userService.resetPassword(body.token, body.newPassword);
  }

  @Post('confirm-email')
  async confirmEmail(@Body() body: { token: string }) {
    return this.userService.confirmEmail(body.token);
  }
}
