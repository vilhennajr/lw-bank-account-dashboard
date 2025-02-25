import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { TransactionType } from 'src/modules/transaction/transaction.entity';

export class TransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @IsPositive()
  amount: number;
}
