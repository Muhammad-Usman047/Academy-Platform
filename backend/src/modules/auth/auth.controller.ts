import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

//   // ⚠️ temporary — use once to create your admin account, then delete this method
//   @Post('seed')
//   seed(@Body() body: { email: string; password: string; name: string }) {
//     return this.authService.seedAdmin(body.email, body.password, body.name);
//   }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: { user: { adminId: number } }) {
    return this.authService.me(req.user.adminId);
  }
}