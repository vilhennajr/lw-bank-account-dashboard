import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './transaction.entity';
import { Account } from '../account/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}

  async createTransaction(
    accountId: number,
    type: TransactionType,
    amount: number,
    targetAccountId?: number,
  ) {
    const account = await this.accountRepo.findOneOrFail({
      where: { id: accountId },
    });

    if (!account) throw new Error('Conta não encontrada.');

    if (type === TransactionType.WITHDRAW && account.balance < amount) {
      throw new Error('Saldo insuficiente.');
    }

    if (type === TransactionType.DEPOSIT) {
      account.balance = parseFloat(account.balance.toString()) + amount;
    } else if (type === TransactionType.WITHDRAW) {
      account.balance = parseFloat(account.balance.toString()) - amount;
    }

    if (type === TransactionType.TRANSFER) {
      if (!targetAccountId) {
        throw new Error('Conta de destino não informada.');
      }

      const targetAccount = await this.accountRepo.findOne({
        where: { id: targetAccountId },
      });

      if (!targetAccount) {
        throw new Error('Conta de destino não encontrada.');
      }

      if (account.balance < amount) {
        throw new Error('Saldo insuficiente para transferência.');
      }

      account.balance = parseFloat(account.balance.toString()) - amount;
      targetAccount.balance =
        parseFloat(targetAccount.balance.toString()) + amount;

      await this.accountRepo.save(account);
      await this.accountRepo.save(targetAccount);

      await this.transactionRepo.save({
        account,
        type: TransactionType.WITHDRAW,
        amount,
      });
      await this.transactionRepo.save({
        account: targetAccount,
        type: TransactionType.DEPOSIT,
        amount,
      });

      return;
    }

    account.balance = parseFloat(account.balance.toFixed(2));

    await this.accountRepo.save(account);

    return this.transactionRepo.save({ account, type, amount });
  }
}
