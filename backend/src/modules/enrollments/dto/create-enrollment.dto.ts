import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  courseId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;
}