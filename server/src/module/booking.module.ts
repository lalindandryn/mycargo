import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from 'src/controller/feed.controller';
import { Booking } from 'src/entity/booking.entity';
import { FeedService } from 'src/service/feed.service';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), TransactionModule],
  providers: [FeedService],
  controllers: [FeedController],
  exports: [TypeOrmModule],
})
export class BookingModule {}
