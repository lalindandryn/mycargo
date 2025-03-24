import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './controller/app.controller';
import { UsersController } from './controller/user.controller';
import { UserModule } from './module/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_container',
      port: 5432,
      username: 'postgres',
      password: 'udahganti77',
      database: 'mycargo',
      autoLoadEntities: true,
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
