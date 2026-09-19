import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../enrollments/entities/enrollment.entity';
import { VerificationResponseDto } from './dto/verification-response.dto';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async verify(rollNumber: string): Promise<VerificationResponseDto> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { rollNumber },
      relations: {
        student: true,
        course: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('No record found for this roll number');
    }

    // shape the public-safe response — no email, phone, or internal ids
    return {
      rollNumber: enrollment.rollNumber,
      studentName: enrollment.student.fullName,
      courseTitle: enrollment.course.title,
      status: enrollment.status,
      startDate: enrollment.startDate,
      completionDate: enrollment.completionDate,
    };
  }
}