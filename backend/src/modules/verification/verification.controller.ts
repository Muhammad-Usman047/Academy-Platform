import { Controller, Get, Param } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get(':rollNumber')
  verify(@Param('rollNumber') rollNumber: string) {
    return this.verificationService.verify(rollNumber);
  }
}