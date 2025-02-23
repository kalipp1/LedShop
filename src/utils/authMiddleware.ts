import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AdminService } from '../admin/admin.service';

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; login: string };
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly adminService: AdminService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException("You must be logged in");
      }

      const token = authHeader.split(" ")[1];

      if (!this.adminService.isTokenValid(token)) {
        throw new UnauthorizedException("Token is invalid or expired");
      }

      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new UnauthorizedException("JWT secret is missing");
      }

      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      if (!decoded.id || !decoded.login) {
        throw new UnauthorizedException("Invalid session data");
      }

      req.user = { id: decoded.id, login: decoded.login };
      next();
    } catch (error) {
      console.error("Error in AuthMiddleware:", error.message);
      throw new UnauthorizedException("You must be logged in");
    }
  }
}