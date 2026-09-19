import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { Student } from '../students/entities/student.entity';
import { Enrollment, EnrollmentStatus } from '../enrollments/entities/enrollment.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(Enrollment) private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async getOverview() {
    const [totalCourses, totalStudents, totalEnrollments, completedCount] = await Promise.all([
      this.courseRepo.count(),
      this.studentRepo.count(),
      this.enrollmentRepo.count(),
      this.enrollmentRepo.count({ where: { status: EnrollmentStatus.COMPLETED } }),
    ]);

    const inProgressCount = totalEnrollments - completedCount;
    const completionRate =
      totalEnrollments === 0 ? 0 : Math.round((completedCount / totalEnrollments) * 100);

    return {
      totalCourses,
      totalStudents,
      totalEnrollments,
      completedCount,
      inProgressCount,
      completionRate,
    };
  }
}