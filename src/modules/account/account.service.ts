import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const user = await this.userRepository.findOne({
      where: { id: createAccountDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const account = this.accountRepository.create({
      balance: createAccountDto.balance,
      user,
    });

    return this.accountRepository.save(account);
  }
  async findById(id: string): Promise<Account> {
    const accountId = Number(id);
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async findByUserId(userId: number): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada para este usuário');
    }

    return account;
  }

  async findBalance(accountId: string): Promise<number> {
    const accountIdNumber = Number(accountId);
    const account = await this.accountRepository.findOne({
      where: { id: accountIdNumber },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    return account.balance;
  }

  async getBalance(userId: number) {
    const account = await this.accountRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!account) throw new NotFoundException('Conta não encontrada');
    return { balance: account.balance };
  }

  async updateBalance(userId: number, newBalance: number): Promise<void> {
    if (newBalance === undefined || newBalance === null) {
      throw new Error('Balance value must be defined');
    }

    const account = await this.accountRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!account) {
      throw new NotFoundException('Conta não encontrada');
    }

    const result = await this.accountRepository.update(account.id, {
      balance: newBalance,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Conta não encontrada');
    }
  }
}
