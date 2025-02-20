import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; login: string };
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new UnauthorizedException("JWT Secret is missing");
    }

    try {
      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      if (!decoded || !decoded.id || !decoded.login) {
        throw new UnauthorizedException("Invalid session data");
      }

      req.user = { id: decoded.id, login: decoded.login };
      next();
    } catch (error) {
      console.error("AuthMiddleware Error:", error);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}