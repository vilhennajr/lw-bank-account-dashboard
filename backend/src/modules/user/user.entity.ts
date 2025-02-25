import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Account, (account) => account.user)
  account: Account;
}
