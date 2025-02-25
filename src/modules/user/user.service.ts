/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'admin', password: 'secret' },
    { id: 2, username: 'admin1', password: 'secret1' },
  ];
  private readonly userRepository: Repository<User>;

  findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
}
