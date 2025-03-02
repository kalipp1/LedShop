import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.user) {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error("No token or wrong form");
        throw new UnauthorizedException('You must be logged in');
      }

      const token = authHeader.split(' ')[1];
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new UnauthorizedException('JWT secret is missing');
      }

      try {
        const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

        if (!decoded.id || !decoded.login) {
          throw new UnauthorizedException('Invalid session data');
        }

        req.user = { id: decoded.id, login: decoded.login };
      } catch (error) {
        console.error("Error decoding token:", error.message);
        throw new UnauthorizedException('Invalid token');
      }
    }

    if (!req.user) {
      throw new UnauthorizedException('You must be logged in');
    }

    if (req.user.login !== 'admin') {
      throw new ForbiddenException('Access denied. Only admin can perform this action.');
    }

    return true;
  }
}