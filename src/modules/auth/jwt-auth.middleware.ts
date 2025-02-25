import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido.');
    }
  }
}
