import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/helper/jwt.strategy';
import { AuthService } from 'src/service/auth.service';
import { UserModule } from './user.module';

@Module({
  imports: [
    JwtModule.register({ secret: 'paichi', signOptions: { expiresIn: '60m' } }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
