import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment, EnrollmentStatus } from './entities/enrollment.entity';
import { Student } from '../students/entities/student.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CompleteEnrollmentDto } from './dto/complete-enrollment.dto';
import { generateRollNumber } from './utils/roll-number.util';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepo: Repository<Enrollment>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateEnrollmentDto): Promise<Enrollment> {
    const student = await this.studentRepo.findOne({
      where: { id: dto.studentId },
    });
    if (!student)
      throw new NotFoundException(`Student #${dto.studentId} not found`);

    const course = await this.courseRepo.findOne({
      where: { id: dto.courseId },
    });
    if (!course)
      throw new NotFoundException(`Course #${dto.courseId} not found`);

    const year = new Date().getFullYear();
    // count existing enrollments for this course this year, to get the next sequence
    const count = await this.enrollmentRepo
      .createQueryBuilder('enrollment')
      .where('enrollment.course_id = :courseId', { courseId: course.id })
      .andWhere('EXTRACT(YEAR FROM enrollment.created_at) = :year', { year })
      .getCount();

    const rollNumber = generateRollNumber(course.courseCode, count + 1);

    const enrollment = this.enrollmentRepo.create({
      rollNumber,
      student,
      course,
      startDate: dto.startDate,
      status: EnrollmentStatus.ENROLLED,
    });

    return this.enrollmentRepo.save(enrollment);
  }

  findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({
      relations: {
        student: true,
        course: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id },
      relations: {
        student: true,
        course: true,
      },
    });
    if (!enrollment) throw new NotFoundException(`Enrollment #${id} not found`);
    return enrollment;
  }

  async complete(id: number, dto: CompleteEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.findOne(id);

    if (enrollment.status === EnrollmentStatus.COMPLETED) {
      throw new BadRequestException(
        'This enrollment is already marked completed',
      );
    }
    if (new Date(dto.completionDate) < new Date(enrollment.startDate)) {
      throw new BadRequestException(
        'Completion date cannot be before the start date',
      );
    }

    enrollment.status = EnrollmentStatus.COMPLETED;
    enrollment.completionDate = dto.completionDate;
    return this.enrollmentRepo.save(enrollment);
  }

  async remove(id: number): Promise<{ message: string }> {
    const enrollment = await this.findOne(id);
    await this.enrollmentRepo.remove(enrollment);
    return { message: `Enrollment #${id} deleted` };
  }
}
