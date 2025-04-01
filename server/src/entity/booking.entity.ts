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
import { Feed } from './feed.entity';
import { BookingStatus, ItemType } from 'src/helper/enums';
import { Transaction } from './transaction.entity';
import { IsDate, IsEnum, IsNotEmpty, IsPositive } from 'class-validator';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  customer: User;

  @ManyToOne(() => Feed, (feed) => feed.bookings)
  feed: Feed;

  @Column()
  @IsNotEmpty()
  item_name: string;

  @Column({
    type: 'enum',
    enum: ItemType,
    default: ItemType.OTHER,
  })
  @IsEnum(ItemType)
  item_type: ItemType;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  item_weight: number;

  @Column()
  @IsNotEmpty()
  item_description: string;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  total_price: number;

  @Column()
  @IsNotEmpty()
  item_pict: string;

  @Column()
  @IsDate()
  booking_date: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  @IsEnum(BookingStatus)
  booking_status: BookingStatus;

  @OneToMany(() => Transaction, (transaction) => transaction.booking)
  transactions: Transaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
