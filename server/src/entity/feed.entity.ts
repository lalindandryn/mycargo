import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { FeedStatus } from 'src/helper/enums';
import { Booking } from './booking.entity';
import { IsDate, IsEnum, IsNotEmpty, IsPositive } from 'class-validator';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.feeds)
  carrier: User;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsPositive()
  maxSlot: number;

  @Column()
  @IsPositive()
  currentSlot: number;

  @Column()
  @IsPositive()
  price_per_slot: number;

  @Column()
  description: string;

  @Column()
  @IsNotEmpty()
  departure_location: string;

  @Column()
  @IsNotEmpty()
  arrival_location: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  departure_date: Date;

  @Column()
  @IsNotEmpty()
  @IsDate()
  arrival_date: Date;

  @Column()
  @IsNotEmpty()
  @IsDate()
  deadline: Date;

  @Column({
    type: 'enum',
    enum: FeedStatus,
    default: FeedStatus.OPEN,
  })
  @IsEnum(FeedStatus)
  status: FeedStatus;

  @OneToMany(() => Booking, (booking) => booking.feed)
  bookings: Booking[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
