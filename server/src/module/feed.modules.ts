import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from 'src/controller/feed.controller';
import { Booking } from 'src/entity/booking.entity';
import { Feed } from 'src/entity/feed.entity';
import { FeedService } from 'src/service/feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, Booking])],
  providers: [FeedService],
  controllers: [FeedController],
  exports: [TypeOrmModule],
})
export class FeedModule {}
