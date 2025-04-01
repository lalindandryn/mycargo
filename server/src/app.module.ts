import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './controller/app.controller';
import { UsersController } from './controller/user.controller';
import { UserModule } from './module/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthModule } from './module/auth.module';
import { User } from './entity/user.entity';
import { Feed } from './entity/feed.entity';
import { Booking } from './entity/booking.entity';
import { Transaction } from './entity/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Feed, Booking, Transaction],
      synchronize: true, //should delete on production
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
