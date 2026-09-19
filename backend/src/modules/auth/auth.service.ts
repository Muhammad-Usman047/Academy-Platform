import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string; admin: { id: number; email: string; name: string | null } }> {
    const admin = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign({ sub: admin.id, email: admin.email });

    return {
      accessToken,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  // called once via a throwaway endpoint to create your first admin — remove/disable after use
  async seedAdmin(email: string, password: string, name: string): Promise<{ message: string }> {
    const existing = await this.adminRepo.findOne({ where: { email } });
    if (existing) {
      return { message: 'Admin already exists' };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = this.adminRepo.create({ email, passwordHash, name });
    await this.adminRepo.save(admin);
    return { message: 'Admin created' };
  }

  async me(adminId: number) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin) throw new UnauthorizedException();
    return { id: admin.id, email: admin.email, name: admin.name };
  }
}