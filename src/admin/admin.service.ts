import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../shared/services/prisma.service";
import { Admin } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  private revokedTokens = new Set<string>();

  async login(login: string, password: string): Promise<{ token: string }> {
    const admin: Admin | null = await this.prisma.admin.findUnique({ where: { login } });

    if (!admin) {
      throw new UnauthorizedException("Invalid login or password");
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid login or password");
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new UnauthorizedException("JWT secret is missing");
    }

    const token = jwt.sign({ id: admin.id, login: admin.login }, secretKey, { expiresIn: "1h" });

    console.log("Wygenerowano token:", token);
    return { token };
  }

   logout(token: string): { message: string } {
    console.log("Unieważniam token:", token);
    this.revokedTokens.add(token);
    return { message: "Logged out successfully" };
  }

  isTokenValid(token: string): boolean {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new UnauthorizedException("JWT Secret is missing");
    }

    if (this.revokedTokens.has(token)) {
      console.log("Token jest unieważniony:", token);
      return false;
    }

    try {
      jwt.verify(token, secretKey);
      return true;
    } catch {
      console.log("Token jest niepoprawny lub wygasł:", token);
      return false;
    }
  }
}