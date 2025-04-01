import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from 'src/controller/transaction.controller';
import { Transaction } from 'src/entity/transaction.entity';
import { TransactionService } from 'src/service/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TypeOrmModule],
})
export class TransactionModule {}
