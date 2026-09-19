import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne,
  JoinColumn, CreateDateColumn,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Enrollment, (enrollment) => enrollment.certificate, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment!: Enrollment;

  @Column({ name: 'issued_date', type: 'date' })
  issuedDate!: string;

  @Column({ name: 'certificate_url', length: 500, nullable: true })
  certificateUrl!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}