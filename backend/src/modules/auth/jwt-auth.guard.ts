import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      request['user'] = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido.');
    }
  }
}
