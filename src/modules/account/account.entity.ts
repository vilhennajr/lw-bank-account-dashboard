import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn()
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;
}
