import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/helper/jwt-auth.guard';
import { UserService } from 'src/service/user.service';

export interface RequestWithUser extends Request {
  user: User;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  async createUser(@Body() body: { username: string; password: string }) {
    return this.usersService.create(body.username, body.password);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
