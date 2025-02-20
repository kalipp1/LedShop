import { Injectable, UnauthorizedException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../shared/services/prisma.service";
import { Admin } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async login(login: string, password: string): Promise<{ token: string }> {
    const admin: Admin | null = await this.prisma.admin.findUnique({ where: { login } });

    if (!admin) {
      throw new UnauthorizedException("Invalid login or password");
    }

    const isValid: boolean = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid login or password");
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new InternalServerErrorException("JWT secret is missing");
    }

    const token = jwt.sign({ id: admin.id, login: admin.login }, secretKey, { expiresIn: "1h" });

    return { token };
  }
}