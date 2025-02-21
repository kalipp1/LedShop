import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminGuard } from "src/guards/admin.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("login")
  async login(@Body() { login, password }: { login: string; password: string }) {
    return this.adminService.login(login, password);
  }

  @Post("logout")
  @UseGuards(AdminGuard)
   logout(@Req() req) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Missing token");
    }
    return this.adminService.logout(token);
  }
}