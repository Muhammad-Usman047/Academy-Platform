import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, OneToMany,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'full_name', length: 200 })
  fullName!: string;

  @Column({ length: 200, nullable: true })
  email!: string;

  @Column({ length: 30, nullable: true })
  phone!: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments!: Enrollment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}