import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionType } from './transaction.entity';

@Controller('event')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body()
    transactionDto: {
      accountId: number;
      type: TransactionType;
      amount: number;
      targetAccountId?: number;
    },
  ) {
    return this.transactionService.createTransaction(
      transactionDto.accountId,
      transactionDto.type,
      transactionDto.amount,
      transactionDto.targetAccountId,
    );
  }
}
