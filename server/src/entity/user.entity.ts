import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Feed } from './feed.entity';
import { Booking } from './booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @Column()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @Column({ nullable: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ default: false })
  @IsNotEmpty()
  isConfirmed: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  profile_pict: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  address: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  phone: string;

  @OneToMany(() => Feed, (feed) => feed.carrier)
  feeds: Feed[];

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
