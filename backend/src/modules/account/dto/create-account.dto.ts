import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsInt()
  balance: number;
}
