import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { TransactionStatus } from 'src/helper/enums';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booking, (booking) => booking.transactions)
  booking: Booking;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  payment_proof: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  delivery_proof: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @Column({ default: false })
  is_completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
