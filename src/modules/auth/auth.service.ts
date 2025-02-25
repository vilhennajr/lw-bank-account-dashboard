import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (user && password === user.password) {
      return user;
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }

  generateJwt(user: any) {
    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
  }
}
