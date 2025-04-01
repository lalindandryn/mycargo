import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/service/user.service';
import { Feed } from 'src/entity/feed.entity';
import { Booking } from 'src/entity/booking.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Feed, Booking]),
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
