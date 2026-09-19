import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 150 })
  slug!: string;

  @Column({ length: 200 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ length: 50, nullable: true })
  duration!: string;

  @Column({ length: 100, nullable: true })
  category!: string;

  // used to build roll numbers, e.g. "WD" for Web Development
  @Column({ name: 'course_code', unique: true, length: 10 })
  courseCode!: string;

  @Column({ name: 'thumbnail_url', length: 500, nullable: true })
  thumbnailUrl!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments!: Enrollment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}