import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne,
  CreateDateColumn, UpdateDateColumn, JoinColumn, Index,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Course } from '../../courses/entities/course.entity';
import { Certificate } from '../../certificates/entities/certificate.entity';

export enum EnrollmentStatus {
  ENROLLED = 'enrolled',
  COMPLETED = 'completed',
}

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ name: 'roll_number', unique: true, length: 50 })
  rollNumber!: string;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ENROLLED,
  })
  status!: EnrollmentStatus;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: string;

  @Column({ name: 'completion_date', type: 'date', nullable: true })
  completionDate!: string | null;

  @OneToOne(() => Certificate, (certificate) => certificate.enrollment)
  certificate!: Certificate;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}